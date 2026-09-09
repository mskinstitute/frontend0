---
id: html-audio-video
slug: audio-video
course: html5
lesson: media
chapter: 10
topic: 10.2
title: Audio & Video in HTML5
description: Master HTML5 native multimedia embedding using audio, video, source, and track elements with controls, autoplay, and accessibility subtitles.
difficulty: Intermediate
readingTime: 12
order: 18
keywords:
  - html5 video
  - html5 audio
  - video tag
  - audio tag
  - track element
  - web multimedia
lastUpdated: 2026-09-05
author: MSK Institute
version: 1.0
hideOnThisPage: true
---

# Audio & Video in HTML5

Before HTML5, embedding audio and video on the web required bulky third-party plugins like Adobe Flash or Silverlight.

HTML5 introduced native `<video>` and `<audio>` elements, allowing seamless multimedia playback directly handled by the web browser with high hardware acceleration and zero plugins.

---

# 1. The `<video>` Element

The `<video>` element embeds video media directly into the webpage.

```html
<video width="640" height="360" controls poster="/images/video-thumb.jpg">
  <source src="/videos/html5-intro.mp4" type="video/mp4">
  <source src="/videos/html5-intro.webm" type="video/webm">
  <track src="/subtitles/en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support the HTML5 video element.
</video>
```

### Video Attributes

| Attribute | Type | Description |
|---|---|---|
| `controls` | Boolean | Displays default playback controls (play/pause, volume, seek bar, fullscreen) |
| `autoplay` | Boolean | Starts playing the video as soon as it is ready |
| `muted` | Boolean | Mutes the audio output (required for `autoplay` in modern browsers!) |
| `loop` | Boolean | Restarts the video automatically when finished |
| `poster` | URL | An image shown while the video is downloading or before play is pressed |
| `preload` | Enum (`auto`/`metadata`/`none`) | Suggests how much video data to buffer on page load |

> ⚠️ **Browser Autoplay Policy**
>
> Modern web browsers block unmuted autoplay video to prevent annoying users with sudden loud audio. If you specify `autoplay`, you **must** also include `muted`:
> ```html
> <video autoplay muted loop playsinline> ... </video>
> ```

---

# 2. The `<audio>` Element

The `<audio>` element works almost identically to `<video>`, but renders audio playback controls:

```html
<audio controls>
  <source src="/audio/lecture-1.mp3" type="audio/mpeg">
  <source src="/audio/lecture-1.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

---

# 3. Providing Multiple Format Fallbacks with `<source>`

Different browsers have historical preferences for video codecs:
- **MP4 (H.264)**: Supported by 100% of modern browsers.
- **WebM (VP9/AV1)**: Open standard, highly compressed and optimized.

By including multiple `<source>` tags inside `<video>` or `<audio>`, the browser automatically selects and downloads the first format it supports:

```html
<video controls>
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
  <p>Fallback text for ancient browsers.</p>
</video>
```

---

# Multiple Choice Questions (MCQs)

### 1. Which attribute must be present on a video tag for the play button and scrubber to appear?

A. `buttons`

B. `player`

C. `controls`

D. `show`

**Answer:** C

---

### 2. Why is `muted` necessary when using the `autoplay` attribute?

A. Video will fail to render otherwise

B. Modern browsers block autoplay unless the video is muted

C. It compresses the video stream

D. It activates subtitles

**Answer:** B

---

# Summary

- HTML5 `<video>` and `<audio>` provide native multimedia playback without plugins.
- Use `<source>` tags to supply multiple format fallbacks (MP4, WebM).
- Always include `controls` unless providing custom JavaScript controls.
- Pair `autoplay` with `muted` to comply with browser safety policies.
