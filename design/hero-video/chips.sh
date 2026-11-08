#!/bin/zsh
# Renders the status-chip overlays (transparent PNG, 640x192) used by the hero video.
# usage: chips.sh <outdir>
set -e
OUT=$1; mkdir -p "$OUT"
FONT=/System/Library/Fonts/SFNS.ttf

chip() { # name label status state(a=in progress, b=done)
  local name=$1 label=$2 stat=$3 state=$4
  local args=(-size 640x192 xc:none
    -fill 'rgba(31,34,36,0.82)' -stroke 'rgba(255,255,255,0.22)' -strokewidth 2
    -draw 'roundrectangle 2,2 637,189 94,94')
  if [ "$state" = "a" ]; then
    # in progress: soft peach ring with a centre dot
    args+=(-fill none -stroke '#ffa366' -strokewidth 6 -draw 'circle 100,96 100,62'
           -fill '#ffa366' -stroke none -draw 'circle 100,96 100,81')
  else
    # done: solid logo-orange disc with a white check
    args+=(-fill '#f77c27' -stroke none -draw 'circle 100,96 100,56'
           -fill none -stroke white -strokewidth 9 -draw 'stroke-linecap round stroke-linejoin round polyline 82,98 95,111 121,82')
  fi
  args+=(-font "$FONT" -stroke none
         -fill '#d6d8d9' -pointsize 37 -annotate +176+80 "$label"
         -fill white -stroke white -strokewidth 1.6 -pointsize 57 -annotate +176+142 "$stat")
  magick "${args[@]}" "$OUT/$name.png"
}

chip enroll_a "Provider enrollment" "In review"   a
chip enroll_b "Provider enrollment" "Approved"    b
chip claim_a  "Claim"               "Submitted"   a
chip claim_b  "Claim"               "Paid"        b
chip license_a "State license"      "Renewal filed" a
chip license_b "State license"      "Renewed"     b
chip report_a "Weekly status report" "Preparing"  a
chip report_b "Weekly status report" "Sent to you" b
ls "$OUT"
