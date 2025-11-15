# Quick Model Replacement Guide 🚀

## Current Setup
The 3D visualizer is now configured to load **different 3D models for each pregnancy week**. Currently using placeholder models that need to be replaced with actual fetal development models.

---

## ⚡ Quick Steps to Add Real Models

### Option 1: Self-Host Models (Recommended)

1. **Create models folder**:
```bash
mkdir public/models
```

2. **Add your GLB files**:
```
public/models/
  ├── fetus-week-08.glb
  ├── fetus-week-12.glb
  ├── fetus-week-16.glb
  ├── fetus-week-20.glb
  ├── fetus-week-24.glb
  ├── fetus-week-28.glb
  ├── fetus-week-32.glb
  ├── fetus-week-36.glb
  └── fetus-week-40.glb
```

3. **Update the code** (`src/pages/visualizer/index.jsx`):

Find these lines and replace the `modelUrl`:

```javascript
8: {
  modelUrl: '/models/fetus-week-08.glb', // ← Change this
  backgroundColor: 'linear-gradient(135deg, #ffe4e4 0%, #ffd4d4 50%, #ffc4c4 100%)',
  // ...
},
12: {
  modelUrl: '/models/fetus-week-12.glb', // ← Change this
  backgroundColor: 'linear-gradient(135deg, #ffd4e4 0%, #ffc4d4 50%, #ffb4c4 100%)',
  // ...
},
// ... repeat for weeks 16, 20, 24, 28, 32, 36, 40
```

---

### Option 2: Use CDN/External URLs

If your models are hosted elsewhere:

```javascript
8: {
  modelUrl: 'https://your-cdn.com/models/week-08.glb',
  // ...
},
```

---

## 🎨 Where to Get Models

### Free Options:
1. **Sketchfab** (https://sketchfab.com)
   - Search: "fetus development"
   - Filter: Downloadable, CC License
   - Format: Download as GLB

2. **NIH 3D Print Exchange** (https://3dprint.nih.gov)
   - Search: "fetus" or "embryo"
   - Download STL, convert to GLB using Blender

### Paid Options:
1. **TurboSquid** - $50-300 per model
2. **CGTrader** - $10-200 per model
3. **Commission on Fiverr** - $100-300 per model

---

## 🎯 Models You Need

| Week | Description | Size |
|------|-------------|------|
| 8 | Early embryo | 1.6 cm (raspberry) |
| 12 | Early fetus | 5.4 cm (lime) |
| 16 | Growing fetus | 11.6 cm (avocado) |
| 20 | Mid-pregnancy | 25.6 cm (banana) |
| 24 | Viability | 30 cm (corn) |
| 28 | Third trimester | 37.6 cm (eggplant) |
| 32 | Preparing | 42.4 cm (squash) |
| 36 | Almost ready | 47.4 cm (papaya) |
| 40 | Full term | 51.2 cm (watermelon) |

---

## 🔄 Converting Models to GLB

If you have models in other formats (OBJ, FBX, STL):

### Using Blender (Free):
1. Download: https://www.blender.org
2. Open Blender
3. File → Import → [Your Format]
4. File → Export → glTF 2.0 (.glb)
5. Settings:
   - Format: GLB ✅
   - Include: Selected Objects ✅

### Using Online Tools:
- https://products.aspose.app/3d/conversion
- https://anyconv.com/stl-to-glb-converter/

---

## 🎨 Customizing Appearance

In `visualizer/index.jsx`, you can customize each week:

```javascript
20: {
  title: 'Week 20 - Halfway There!',
  size: '25.6 cm (size of a banana)',
  weight: '300 grams',
  modelUrl: '/models/fetus-week-20.glb',
  
  // Change background gradient ↓
  backgroundColor: 'linear-gradient(135deg, #ffb4c4 0%, #ffa4b4 50%, #ff94a4 100%)',
  
  developments: [...]
}
```

### Gradient Generator:
Use https://cssgradient.io/ to create custom gradients

---

## 📊 Current Background Colors

Each week has a unique gradient (pink/red theme for womb):

```css
Week 8:  #ffe4e4 → #ffd4d4 → #ffc4c4 (lightest pink)
Week 12: #ffd4e4 → #ffc4d4 → #ffb4c4
Week 16: #ffc4d4 → #ffb4c4 → #ffa4b4
Week 20: #ffb4c4 → #ffa4b4 → #ff94a4 (current)
Week 24: #ffa4b4 → #ff94a4 → #ff8494
Week 28: #ff94a4 → #ff8494 → #ff7484
Week 32: #ff8494 → #ff7484 → #ff6474
Week 36: #ff7484 → #ff6474 → #ff5464
Week 40: #ff6474 → #ff5464 → #ff4454 (darkest pink/red)
```

*Progression: Lighter → Darker as baby grows*

---

## 🔧 Testing Your Models

1. **Add ONE model first** (e.g., Week 20):
```javascript
20: {
  modelUrl: '/models/test-fetus.glb',
  // ...
}
```

2. **Visit**: http://localhost:4028/visualizer

3. **Select Week 20** and verify:
   - ✅ Model loads without errors
   - ✅ Can rotate, zoom, pan
   - ✅ Size looks appropriate
   - ✅ Colors/textures look good

4. **Adjust camera** if needed:
```html
<model-viewer
  camera-orbit="0deg 75deg 105%"  ← Change distance (105%)
  field-of-view="30deg"           ← Change zoom (30deg)
  ...
/>
```

5. **Repeat** for all 9 weeks

---

## 🎬 Live Example

Currently implemented with placeholder. To see it work:

```bash
# Navigate to visualizer
http://localhost:4028/visualizer

# Try different weeks - each loads unique model
# Notice:
# - Different backgrounds per week ✅
# - Loading animation ✅
# - Smooth transitions ✅
# - Camera controls ✅
```

---

## ⚠️ Important Notes

1. **File Size**: Keep models under 5MB each
2. **Format**: Must be GLB (not OBJ, FBX, STL)
3. **Orientation**: Models should face forward (Y-up axis)
4. **License**: Ensure you have rights to use models
5. **Attribution**: Add credits if using CC-licensed models

---

## 🆘 Troubleshooting

### Model doesn't appear:
- Check browser console for errors
- Verify GLB file is valid (test at https://gltf-viewer.donmccurdy.com/)
- Check file path is correct
- Ensure file is publicly accessible

### Model is too small/large:
Adjust `camera-orbit` third parameter:
```html
camera-orbit="0deg 75deg 80%"   <!-- Closer -->
camera-orbit="0deg 75deg 150%"  <!-- Farther -->
```

### Model is too dark/bright:
Adjust `exposure`:
```html
exposure="1.0"  <!-- Darker -->
exposure="2.0"  <!-- Brighter -->
```

### Model orientation wrong:
Use Blender to rotate, then re-export

---

## 📝 Attribution Template

If using CC-licensed models, add to your page:

```html
<footer>
  3D fetal models courtesy of:
  - Week 8-12: [Artist Name] (Sketchfab)
  - Week 16-24: [Artist Name] (Sketchfab)
  - Week 28-40: [Artist Name] (Sketchfab)
  Licensed under CC-BY 4.0
</footer>
```

---

## ✅ Checklist

Before launch:
- [ ] All 9 GLB files prepared
- [ ] Files uploaded to public/models/ or CDN
- [ ] All modelUrl paths updated in code
- [ ] Tested each week in browser
- [ ] Camera angles adjusted if needed
- [ ] Backgrounds look good
- [ ] Attribution added (if required)
- [ ] Performance tested (< 2s load time)

---

## 🚀 Ready to Launch?

Once you have all models:
1. Update all 9 `modelUrl` values
2. Test each week
3. Verify mobile responsive
4. Deploy! 🎉

**Current Status**: ✅ Code ready, ⏳ Need models

---

For detailed model sourcing guide, see: `FETAL_3D_MODELS_GUIDE.md`
