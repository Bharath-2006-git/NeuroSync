# 3D Fetal Models Integration Guide

## 🎯 Current Implementation

The visualizer now supports **dynamic 3D model loading** for each pregnancy week with:
- ✅ Week-specific model URLs
- ✅ Custom gradient backgrounds per week
- ✅ Anatomically accurate camera positioning
- ✅ Smooth transitions between weeks
- ✅ Loading states for model initialization

---

## 📦 Where to Get Medical-Grade 3D Fetal Models

### Option 1: **Sketchfab** (Recommended)
**Website**: https://sketchfab.com/

#### Search Terms:
- "fetal development"
- "fetus weeks"
- "embryo 3D"
- "pregnancy stages"
- "prenatal development"

#### Steps:
1. Search for models with **CC Attribution** or **CC0** licenses
2. Download in **glTF** or **GLB** format
3. Look for models labeled by weeks (8, 12, 16, 20, 24, 28, 32, 36, 40)
4. Host on your server or use Sketchfab's embed API

**Popular Models**:
- Search: "fetus 20 weeks" - Returns anatomically accurate models
- Filter by: Downloadable, Free License
- Format: GLB (recommended for web)

---

### Option 2: **NIH 3D Print Exchange**
**Website**: https://3dprint.nih.gov/

#### Features:
- Medically accurate models from NIH
- Free for educational/personal use
- Available in multiple formats

#### Steps:
1. Search: "fetus" or "embryo"
2. Download STL files
3. Convert to GLB using Blender (free software)
4. Upload to your hosting

---

### Option 3: **TurboSquid** (Premium)
**Website**: https://www.turbosquid.com/

#### Search:
- "fetal development"
- "human fetus"
- Filter by: Rigged, Animated, GLB format

**Cost**: $50-$300 per model
**Quality**: Professional medical visualization grade
**License**: Check each model (usually royalty-free after purchase)

---

### Option 4: **CGTrader**
**Website**: https://www.cgtrader.com/

#### Search:
- "fetus 3D model"
- "embryo development"

**Cost**: $10-$200 per model
**Formats**: GLB, GLTF, FBX (convertible)
**Quality**: Varies, check reviews

---

### Option 5: **BioDigital Human API** (Commercial)
**Website**: https://www.biodigital.com/

#### Features:
- Medical-grade anatomical models
- API for embedding
- Interactive anatomy with labels
- Subscription-based

**Cost**: Contact for pricing
**Best For**: Professional medical applications

---

## 🔧 How to Integrate Your Own Models

### Step 1: Prepare Your Models

Each model should be in **GLB format** (GLTF Binary). If you have other formats:

**Using Blender (Free)**:
```bash
1. Download Blender: https://www.blender.org/
2. File → Import → Your format (OBJ, FBX, STL, etc.)
3. File → Export → glTF 2.0 (.glb)
4. Settings:
   - Format: GLB
   - Include: Selected Objects
   - Transform: +Y Up
   - Geometry: Apply Modifiers
```

**Using Online Converters**:
- https://products.aspose.app/3d/conversion
- https://anyconv.com/stl-to-glb-converter/
- https://www.greentoken.de/onlineconv/

---

### Step 2: Host Your Models

#### Option A: **Self-Hosting** (Recommended)
```bash
# Create public folder for models
mkdir public/models/fetal

# Place your GLB files
public/models/fetal/week-08.glb
public/models/fetal/week-12.glb
public/models/fetal/week-16.glb
# ... etc
```

Update `developmentData` in `visualizer/index.jsx`:
```javascript
8: {
  modelUrl: '/models/fetal/week-08.glb',
  // ... rest of config
},
12: {
  modelUrl: '/models/fetal/week-12.glb',
  // ... rest of config
}
```

#### Option B: **CDN Hosting**
Upload to:
- **AWS S3** + CloudFront
- **Google Cloud Storage**
- **Azure Blob Storage**
- **DigitalOcean Spaces**

Example CDN URLs:
```javascript
modelUrl: 'https://your-cdn.com/fetal/week-08.glb'
```

#### Option C: **GitHub Raw**
```bash
# Create GitHub repo
mkdir fetal-models
# Add GLB files
# Push to GitHub

# Use raw URLs
https://raw.githubusercontent.com/username/repo/main/week-08.glb
```

---

### Step 3: Update the Code

Edit: `src/pages/visualizer/index.jsx`

```javascript
const developmentData = {
  8: {
    title: 'Week 8 - Embryo',
    size: '1.6 cm (size of a raspberry)',
    weight: '1 gram',
    modelUrl: '/models/fetal/week-08.glb', // ✅ Your model here
    backgroundColor: 'linear-gradient(135deg, #ffe4e4 0%, #ffd4d4 50%, #ffc4c4 100%)',
    developments: [...]
  },
  // Repeat for weeks: 12, 16, 20, 24, 28, 32, 36, 40
}
```

---

## 🎨 Model Optimization Tips

### 1. **File Size**
- Target: < 5MB per model
- Use Blender's "Decimate" modifier to reduce polygon count
- Compress textures to 1024x1024 or smaller

### 2. **Camera Settings**
Adjust in the model-viewer component:
```html
camera-orbit="0deg 75deg 105%"     <!-- Angle and distance -->
field-of-view="30deg"              <!-- Zoom level -->
min-camera-orbit="auto auto 80%"  <!-- Closest zoom -->
max-camera-orbit="auto auto 150%" <!-- Farthest zoom -->
```

### 3. **Lighting**
```html
exposure="1.5"          <!-- Brightness -->
shadow-intensity="1.5"  <!-- Shadow darkness -->
```

### 4. **Performance**
```javascript
// Preload next/previous week models
useEffect(() => {
  const nextWeekData = developmentData[currentWeek + 4];
  if (nextWeekData) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = nextWeekData.modelUrl;
    document.head.appendChild(link);
  }
}, [currentWeek]);
```

---

## 🔍 Recommended Free Models

### Sketchfab Collections:
1. **"Human Fetus 20 Weeks" by Medical-3D**
   - License: CC Attribution
   - Quality: High
   - Link: Search "fetus 20 weeks" on Sketchfab

2. **"Embryo Development Series"**
   - Multiple stages available
   - Free with attribution

3. **"Prenatal Development Collection"**
   - Educational use approved
   - Detailed anatomy

---

## 📋 Model Requirements Checklist

For each week (8, 12, 16, 20, 24, 28, 32, 36, 40), you need:

- [ ] GLB format (not OBJ, FBX, STL)
- [ ] File size < 5MB
- [ ] Proper orientation (Y-up recommended)
- [ ] Anatomically accurate for that week
- [ ] Textures included (or use flat shading)
- [ ] License allows commercial use (if applicable)

---

## 🎯 Quick Start Guide

### For Testing (Use Placeholder):
```javascript
modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb'
```

### For Production (Buy or Source):
1. **Buy**: TurboSquid "Fetal Development Series" (~$200-500 for all weeks)
2. **Free**: Sketchfab CC models (requires attribution)
3. **Custom**: Commission from 3D artist on Fiverr (~$100-300 per model)

---

## 🖼️ Alternative: Use Images with 3D Effect

If 3D models are too expensive, create a **pseudo-3D effect** with high-quality images:

```javascript
// Use image instead of model-viewer
<div className="relative h-[500px] flex items-center justify-center"
     style={{ background: currentData.backgroundColor }}>
  <img 
    src={currentData.imageUrl} 
    alt={currentData.title}
    className="max-h-full object-contain animate-float"
  />
</div>

// CSS for floating animation
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
```

**Image Sources**:
- Shutterstock: Search "fetal development 3D render"
- Getty Images: Medical illustration collections
- Unsplash: Search "pregnancy ultrasound" (free)

---

## 📝 Legal Considerations

### ⚠️ Important:
1. **Medical Accuracy**: Ensure models are anatomically correct
2. **Attribution**: Give credit if using CC-licensed models
3. **Commercial Use**: Check license allows commercial use
4. **Educational Use**: Most free models are OK for educational purposes
5. **FDA Compliance**: If used for medical advice, consult legal team

### Model License Types:
- **CC0**: Free, no attribution required ✅
- **CC-BY**: Free, attribution required ✅
- **Royalty-Free**: One-time purchase, unlimited use ✅
- **Editorial Use Only**: Cannot use commercially ❌

---

## 🚀 Next Steps

1. **Immediate** (Testing):
   - Current placeholder models work for development
   - Focus on functionality and UX

2. **Short-term** (Launch):
   - Source free Sketchfab models with CC-BY license
   - Add attribution footer to visualizer page

3. **Long-term** (Production):
   - Purchase professional medical model set ($200-500)
   - Or commission custom models from medical illustrator
   - Host on CDN for optimal performance

---

## 📞 Support Resources

### 3D Model Help:
- Blender Community: https://www.blender.org/community/
- Sketchfab Forum: https://forum.sketchfab.com/
- CGTrader Support: support@cgtrader.com

### Medical Accuracy:
- Consult with OB-GYN or embryologist
- Reference: "The Developing Human" textbook
- NIH Embryo Images: https://embryo.asu.edu/

---

## ✅ Current Status

- ✅ Code infrastructure ready for custom models
- ✅ Dynamic model loading per week
- ✅ Custom backgrounds per week
- ✅ Loading states implemented
- ⏳ Placeholder models (needs replacement)
- ⏳ Need to source 9 GLB files (one per week)

---

**Total Cost Estimate**:
- **Free Route**: $0 (Sketchfab CC models + attribution)
- **Mid-Range**: $200-500 (TurboSquid bundle)
- **Premium**: $1000-2000 (Custom commissioned models)
- **Enterprise**: $5000+ (BioDigital API license)

**Recommended**: Start with free Sketchfab models, upgrade to purchased models after validation.
