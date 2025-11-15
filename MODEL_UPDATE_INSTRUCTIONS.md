# Code Location Reference 📍

## File to Edit
**Path**: `src/pages/visualizer/index.jsx`

**Lines**: ~25-175 (developmentData object)

---

## Exact Code to Modify

Find this section in the file and update the `modelUrl` values:

```javascript
// Around line 25
const developmentData = {
  8: {
    title: 'Week 8 - Embryo',
    size: '1.6 cm (size of a raspberry)',
    weight: '1 gram',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb', 
    // ↑ REPLACE THIS URL WITH YOUR MODEL ↑
    backgroundColor: 'linear-gradient(135deg, #ffe4e4 0%, #ffd4d4 50%, #ffc4c4 100%)',
    developments: [...]
  },
  
  12: {
    title: 'Week 12 - Early Fetus',
    size: '5.4 cm (size of a lime)',
    weight: '14 grams',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    backgroundColor: 'linear-gradient(135deg, #ffd4e4 0%, #ffc4d4 50%, #ffb4c4 100%)',
    developments: [...]
  },
  
  16: {
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    // ...
  },
  
  20: {
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    // ...
  },
  
  24: {
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    // ...
  },
  
  28: {
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    // ...
  },
  
  32: {
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    // ...
  },
  
  36: {
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    // ...
  },
  
  40: {
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    // ↑ REPLACE THIS URL ↑
    // ...
  }
};
```

---

## Replace With Examples

### If using self-hosted files:
```javascript
8: {
  modelUrl: '/models/fetus-week-08.glb',
  // ...
},
12: {
  modelUrl: '/models/fetus-week-12.glb',
  // ...
},
// etc...
```

### If using CDN:
```javascript
8: {
  modelUrl: 'https://your-cdn.com/models/week-08.glb',
  // ...
},
```

### If using Sketchfab (after download):
```javascript
8: {
  modelUrl: '/models/embryo-8weeks.glb',
  // ...
},
```

---

## Search & Replace

Use VS Code's Find & Replace (Ctrl+H):

**Find**:
```
https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb
```

**Replace with** (example):
```
/models/fetus-week-
```

Then manually add week numbers: `08.glb`, `12.glb`, etc.

---

## Visual Studio Code Steps

1. Open `src/pages/visualizer/index.jsx`
2. Press `Ctrl+F` (Find)
3. Search for: `modelUrl`
4. You'll see 9 results (one for each week)
5. Update each one with your model path

---

## Testing

After updating:

```bash
# Visit visualizer
http://localhost:4028/visualizer

# Click each week button to test
Week 8 → Should load your Week 8 model
Week 12 → Should load your Week 12 model
# etc...
```

---

## Backup Original

Before editing, copy the file:

```bash
# Windows
copy src\pages\visualizer\index.jsx src\pages\visualizer\index.backup.jsx

# Or in VS Code
# Right-click file → Copy
# Right-click folder → Paste
# Rename to index.backup.jsx
```

---

## Need Help?

1. Check: `QUICK_MODEL_SETUP.md` for model sourcing
2. Check: `FETAL_3D_MODELS_GUIDE.md` for detailed instructions
3. Browser console (F12) shows errors if model fails to load

---

## Current Model (Placeholder)

The Fox astronaut model is just for testing. It proves the system works - now just swap in real fetal models!

**Placeholder URL**:
```
https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb
```

**Your models should be**:
```
/models/fetus-week-08.glb
/models/fetus-week-12.glb
/models/fetus-week-16.glb
/models/fetus-week-20.glb
/models/fetus-week-24.glb
/models/fetus-week-28.glb
/models/fetus-week-32.glb
/models/fetus-week-36.glb
/models/fetus-week-40.glb
```

---

## Line-by-Line Location

| Week | Approximate Line Number |
|------|------------------------|
| Week 8 | Line ~30 |
| Week 12 | Line ~45 |
| Week 16 | Line ~60 |
| Week 20 | Line ~75 |
| Week 24 | Line ~90 |
| Week 28 | Line ~105 |
| Week 32 | Line ~120 |
| Week 36 | Line ~135 |
| Week 40 | Line ~150 |

*Note: Line numbers may vary slightly*

---

## Done! ✅

Once you update all 9 `modelUrl` values with your actual fetal models, the visualizer will show anatomically accurate 3D representations for each pregnancy week!
