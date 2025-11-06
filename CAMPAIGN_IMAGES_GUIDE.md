# Campaign Images - How It Works

## 🖼️ Image Priority System

The CampaignsSection now uses a **3-tier priority system** for displaying images:

### **Priority 1: Uploaded Images (Recommended)**
- Images uploaded via Admin Panel
- Uses `primary_image` from API
- **Most flexible** - admin can upload any image

### **Priority 2: First Image**
- If no primary image, uses first uploaded image
- Fallback from image gallery

### **Priority 3: Hardcoded Fallback**
- Local images based on campaign name
- Only used if no images uploaded
- Legacy system for backward compatibility

---

## 📋 How Images Are Selected

```typescript
// Priority order:
1. campaign.primary_image?.image_url     // ✅ Uploaded in admin (Cloudinary)
2. campaign.images[0]?.image_url         // ✅ First image from gallery
3. Hardcoded based on name               // ⚠️ Fallback only
   - "helicopter" → /helicopter.webp
   - "wellness" or "health" → /healthatm.webp
   - "vr" or "virtual reality" → /vr.webp
```

---

## 🎯 How to Set Campaign Images

### **Method 1: Upload via Admin Panel (Recommended)**

1. **Go to Admin Panel:**
   - Navigate to: http://localhost:5174/products
   - Login as admin

2. **Find Your Campaign:**
   - Filter by "Campaigns" type
   - Click "View" on the campaign

3. **Upload Image:**
   - Go to "Image Gallery" section
   - Click "Upload Image"
   - Select your image file
   - First uploaded image automatically becomes primary

4. **Mark as Popular:**
   - Go back to product list
   - Click "☆ Mark Popular" button
   - Campaign becomes Popular #1, #2, or #3

5. **Verify on Homepage:**
   - Go to: http://localhost:3000
   - Scroll to "Popular Campaigns"
   - Your uploaded image should appear!

---

### **Method 2: Use Hardcoded Images (Legacy)**

If you don't upload images, the system falls back to hardcoded images based on campaign name:

**Helicopter Campaign:**
- Name must include: "helicopter"
- Uses: `/public/helicopter.webp`

**Wellness Campaign:**
- Name must include: "wellness" or "health"
- Uses: `/public/healthatm.webp`

**VR Campaign:**
- Name must include: "vr" or "virtual reality"
- Uses: `/public/vr.webp`

**Other Campaigns:**
- No image shown (or add your own mapping)

---

## 🔄 Migration Path

### **Current Setup (Hardcoded):**
```
Campaign Name: "Helicopter Landing Campaign"
Image: /helicopter.webp (hardcoded)
```

### **New Setup (Uploaded):**
```
Campaign Name: "Helicopter Landing Campaign"
Image: https://res.cloudinary.com/.../helicopter.jpg (uploaded)
Fallback: /helicopter.webp (if no upload)
```

---

## 📝 Step-by-Step: Add Images to Existing Campaigns

### **For Your 3 Popular Campaigns:**

1. **Helicopter Landing Campaign:**
   ```
   - Go to admin panel
   - Find "Helicopter Landing Campaign"
   - Click "View"
   - Upload helicopter image
   - Mark as Popular #1
   ```

2. **Wellness on Wheels Campaign:**
   ```
   - Find "Wellness on Wheels Campaign"
   - Click "View"
   - Upload health/wellness image
   - Mark as Popular #2
   ```

3. **VR Panchayath Campaign:**
   ```
   - Find "VR Panchayath Campaign"
   - Click "View"
   - Upload VR/technology image
   - Mark as Popular #3
   ```

---

## 🎨 Image Requirements

### **Recommended Specs:**
- **Format**: JPG, PNG, or WebP
- **Size**: Max 5MB (Cloudinary auto-optimizes)
- **Dimensions**: 1920x1080 or similar (16:9 ratio)
- **Content**: Clear, high-quality campaign visuals

### **What Happens After Upload:**
- ✅ Uploaded to Cloudinary
- ✅ Auto-optimized (compressed 30-50%)
- ✅ Thumbnail generated automatically
- ✅ Served via global CDN
- ✅ Fast loading worldwide

---

## 🔍 Troubleshooting

### **Issue: Campaign shows no image**

**Check:**
1. Is image uploaded in admin panel?
2. Is campaign marked as popular?
3. Does campaign name match hardcoded fallback?

**Solution:**
- Upload image via admin panel
- Or ensure campaign name includes keywords (helicopter, wellness, vr)

### **Issue: Wrong image showing**

**Check:**
1. Which image is marked as primary?
2. Is there a hardcoded fallback matching the name?

**Solution:**
- Set correct image as primary in admin panel
- Or upload new image (first upload becomes primary)

### **Issue: Image not loading**

**Check:**
1. Is Cloudinary configured? (Check backend/.env)
2. Is image URL valid?

**Solution:**
- Verify CLOUDINARY_* env variables are set
- Restart Django server
- Re-upload image

---

## 💡 Best Practices

### **Do:**
- ✅ Upload high-quality images via admin panel
- ✅ Use descriptive alt text
- ✅ Mark best image as primary
- ✅ Test on homepage after upload

### **Don't:**
- ❌ Rely on hardcoded images for new campaigns
- ❌ Upload very large images (>5MB)
- ❌ Use copyrighted images without permission
- ❌ Forget to mark campaign as popular

---

## 📊 Current vs New System

### **Before (Hardcoded):**
```typescript
// Fixed mapping in code
if (name.includes("helicopter")) {
  return "/helicopter.webp";
}
```
**Problems:**
- Can't change without code changes
- Limited to predefined campaigns
- Not flexible

### **After (Dynamic):**
```typescript
// Uses uploaded image from API
if (campaign.primary_image?.image_url) {
  return campaign.primary_image.image_url;
}
// Falls back to hardcoded if needed
```
**Benefits:**
- ✅ Admin can upload any image
- ✅ No code changes needed
- ✅ Flexible for any campaign
- ✅ Cloudinary optimization
- ✅ Backward compatible

---

## 🎯 Summary

**Image Priority:**
1. **Uploaded Image** (primary_image) - Use this!
2. **First Image** (images[0]) - Automatic fallback
3. **Hardcoded** (name-based) - Legacy fallback

**To Add Images:**
1. Go to admin panel
2. Upload image for campaign
3. Mark campaign as popular
4. Image appears on homepage

**Benefits:**
- No code changes needed
- Flexible and dynamic
- Cloudinary optimization
- Fast global delivery

---

**Ready to add images to your campaigns? Just upload them in the admin panel!** 🎉
