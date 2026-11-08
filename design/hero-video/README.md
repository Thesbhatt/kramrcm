# Hero loop video

`public/video/hero-loop.mp4` (18 s, 1600x900, 30 fps, H.264, about 2 MB, no audio) is built from the hero photos in
`src/assets/photos/hero-slide-*.jpg` with ffmpeg and ImageMagick only (no AI video, no stock footage).

- 4 scenes (team, tablet, phone, huddle), each with a slow zoom and pan, 1 s dissolves, cut so the last frame flows into the first.
- A status chip fades in on each scene and flips from "in progress" to "done" (generic process states, no client claims).

Rebuild (needs `ffmpeg` and `magick`; macOS fonts are used for the chip text):

    zsh design/hero-video/chips.sh /tmp/hero-chips        # draws the 8 chip PNGs
    mkdir -p /tmp/hero-work && cp -R /tmp/hero-chips /tmp/hero-work/chips
    zsh design/hero-video/build.sh src/assets/photos /tmp/hero-work public/video/hero-loop.mp4

When the client sends real footage, replace this video (keep it under about 3 MB, muted, seamless loop) and update the poster photo in `home/hero.tsx`.
