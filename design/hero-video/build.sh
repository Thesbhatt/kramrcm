#!/bin/zsh
# Builds the Kram hero loop: 4 photo scenes (slow drift + a status chip that flips to "done"),
# 1 s dissolves, trimmed so the last frame flows into the first (seamless loop).
# usage: build.sh <photos dir> <work dir> <output.mp4>
set -e
PH=$1; WK=$2; OUT=$3
CH=$WK/chips
W=1600; H=900; FPS=30
D=5.5          # seconds per scene clip
DIS=1.0        # dissolve length
typeset -i N=$(( D * FPS ))   # frames per scene (165)
CX=$(( W - 400 - 100 )); CY=545   # chip position (400 px wide after scaling)

# scene <name> <flip 0|1> <pan from> <pan to> <y> <chip prefix>
scene() {
  local name=$1 flip=$2 p0=$3 p1=$4 py=$5 chip=$6
  local pre="scale=3200:-1:flags=lanczos"
  [ "$flip" = "1" ] && pre="hflip,$pre"
  ffmpeg -y -v error -loop 1 -framerate $FPS -t $D -i "$PH/hero-slide-$name.jpg" \
    -loop 1 -framerate $FPS -t $D -i "$CH/${chip}_a.png" \
    -loop 1 -framerate $FPS -t $D -i "$CH/${chip}_b.png" \
    -filter_complex "
      [0:v]$pre,zoompan=z='1.03+0.07*on/$N':x='(iw-iw/zoom)*($p0+($p1-$p0)*on/$N)':y='(ih-ih/zoom)*$py':d=1:s=${W}x${H}:fps=$FPS,eq=saturation=1.08:contrast=1.04,format=yuv420p[bg];
      [1:v]scale=400:-1,format=rgba,fade=t=in:st=0.8:d=0.5:alpha=1,fade=t=out:st=2.5:d=0.3:alpha=1[ca];
      [2:v]scale=400:-1,format=rgba,fade=t=in:st=2.5:d=0.3:alpha=1,fade=t=out:st=4.0:d=0.5:alpha=1[cb];
      [bg][ca]overlay=x=$CX:y='$CY+22*pow(1-clip((t-0.8)/0.7,0,1),3)':format=auto[o1];
      [o1][cb]overlay=x=$CX:y=$CY:format=auto,format=yuv420p[v]" \
    -map "[v]" -frames:v $N -r $FPS -c:v libx264 -preset veryfast -crf 12 -pix_fmt yuv420p "$WK/scene_$name.mp4"
  echo "scene $name ok"
}

scene team   0 0.35 0.65 0.40 enroll
scene tablet 0 0.70 0.35 0.45 claim
scene phone  1 0.30 0.60 0.35 license
scene huddle 0 0.60 0.40 0.50 report

# chain: team -> tablet -> phone -> huddle -> team (again), then cut one full loop out of the middle
S=$(( D - DIS ))
ffmpeg -y -v error \
  -i "$WK/scene_team.mp4" -i "$WK/scene_tablet.mp4" -i "$WK/scene_phone.mp4" -i "$WK/scene_huddle.mp4" -i "$WK/scene_team.mp4" \
  -filter_complex "
    [0][1]xfade=transition=fade:duration=${DIS}:offset=${S}[x1];
    [x1][2]xfade=transition=fade:duration=${DIS}:offset=$(( S * 2 ))[x2];
    [x2][3]xfade=transition=fade:duration=${DIS}:offset=$(( S * 3 ))[x3];
    [x3][4]xfade=transition=fade:duration=${DIS}:offset=$(( S * 4 ))[x4];
    [x4]trim=start=${DIS}:end=$(( S * 4 + DIS )),setpts=PTS-STARTPTS[v]" \
  -map "[v]" -r $FPS -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -profile:v high -movflags +faststart -an "$OUT"
echo "done"
ffprobe -v error -show_entries format=duration,size -of default=nw=1 "$OUT"
