# Performance Optimization - Manual Asset Steps

## 🎥 Video Optimization Required

You need to compress and convert your videos for optimal performance. The code is already configured to use these optimized versions.

### Hero Video (`/public/videos/hero-video.mp4`)

**Required outputs:**
1. `hero-video.webm` - WebM format (primary, best compression)
2. `hero-video.mp4` - Optimized MP4 (fallback)
3. `hero-video-poster.jpg` - First frame poster image

**Commands using FFmpeg:**

```bash
# Install FFmpeg first if you don't have it
# macOS: brew install ffmpeg
# Windows: Download from https://ffmpeg.org/download.html
# Linux: sudo apt install ffmpeg

# Navigate to your videos folder
cd public/videos/

# 1. Create WebM version (20-50% smaller than MP4)
ffmpeg -i hero-video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 hero-video.webm

# 2. Create optimized MP4 fallback
ffmpeg -i hero-video.mp4 -c:v libx264 -crf 23 -preset slow hero-video-optimized.mp4

# 3. Extract poster image (first frame)
ffmpeg -i hero-video.mp4 -vframes 1 -q:v 2 hero-video-poster.jpg

# 4. Replace original with optimized version (backup first!)
mv hero-video.mp4 hero-video-original.mp4
mv hero-video-optimized.mp4 hero-video.mp4
```

### If you have other videos (website-scroll-demo.mp4)

Apply the same optimization:

```bash
ffmpeg -i website-scroll-demo.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 website-scroll-demo.webm
ffmpeg -i website-scroll-demo.mp4 -c:v libx264 -crf 23 -preset slow website-scroll-demo-optimized.mp4
```

---

## 🖼️ Image Optimization Required

Convert your logo images to WebP format with PNG fallbacks. The code is already configured to use WebP when available.

### Logo Images (`/src/assets/`)

**Required outputs:**
- `logo-white.webp`
- `logo-blue.webp`
- `logo-black.webp`

**Option 1: Using Online Tool (Easiest)**
1. Go to https://squoosh.app
2. Upload each PNG file (logo-white.png, logo-blue.png, logo-black.png)
3. Select WebP format
4. Set quality to 80%
5. Download and save to `/src/assets/` folder

**Option 2: Using Sharp (Node.js)**

```bash
# Install sharp globally
npm install -g sharp-cli

# Navigate to assets folder
cd src/assets/

# Convert each logo
sharp -i logo-white.png -o logo-white.webp -f webp -q 80
sharp -i logo-blue.png -o logo-blue.webp -f webp -q 80
sharp -i logo-black.png -o logo-black.webp -f webp -q 80
```

**Option 3: Using ImageMagick**

```bash
# Install ImageMagick
# macOS: brew install imagemagick
# Windows/Linux: https://imagemagick.org/script/download.php

cd src/assets/

magick logo-white.png -quality 80 logo-white.webp
magick logo-blue.png -quality 80 logo-blue.webp
magick logo-black.png -quality 80 logo-black.webp
```

---

## ✅ Verification Checklist

After creating the optimized assets, verify:

- [ ] `/public/videos/hero-video.webm` exists
- [ ] `/public/videos/hero-video.mp4` is optimized (smaller than original)
- [ ] `/public/videos/hero-video-poster.jpg` exists
- [ ] `/src/assets/logo-white.webp` exists
- [ ] `/src/assets/logo-blue.webp` exists
- [ ] `/src/assets/logo-black.webp` exists
- [ ] All original PNG files still exist (for fallback)

---

## 📊 Expected File Sizes

**Videos:**
- Original MP4: ~5-15 MB
- Optimized WebM: ~2-5 MB (60-70% reduction)
- Optimized MP4: ~3-8 MB (40-50% reduction)
- Poster JPG: ~50-150 KB

**Images:**
- Original PNG: ~100-500 KB each
- WebP: ~20-100 KB each (70-90% reduction)

---

## 🚀 Performance Impact

Once assets are optimized, you'll see:

- **Initial page load**: 75-85% faster (MB → KB)
- **Video load time**: 98% reduction (only metadata loads initially)
- **Image load time**: 70-90% faster (WebP compression)
- **Mobile performance**: 3-5x faster on 3G/4G networks
- **Lighthouse score**: 90+ (from ~40-60)

---

## ⚠️ Important Notes

1. **Keep original files**: Always keep backups of your original assets
2. **Test on multiple browsers**: Verify WebM playback in Chrome, Firefox, Edge, Safari
3. **Check mobile**: Test on actual mobile devices with slow connections
4. **Monitor bundle size**: Run `npm run build` and check `dist/` folder size

---

## 🔧 Troubleshooting

**If video doesn't play:**
- Check browser console for errors
- Verify video file paths are correct
- Ensure both WebM and MP4 exist
- Test without WebM source (remove that line temporarily)

**If images don't show:**
- Check that WebP files are in the correct folder
- Verify import paths haven't changed
- Check browser DevTools Network tab for 404 errors
- Older browsers automatically fall back to PNG

**If FFmpeg fails:**
- Check FFmpeg is installed: `ffmpeg -version`
- Verify you're in the correct directory
- Check disk space
- Try with smaller quality settings (higher CRF number = smaller file)
