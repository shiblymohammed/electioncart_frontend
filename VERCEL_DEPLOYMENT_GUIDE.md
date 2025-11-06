# Vercel Deployment Guide - Quick Start 🚀

## LapoElectionCart.com Frontend

---

## ✅ Pre-Deployment Checklist

- [x] Environment variables configured
- [x] next.config.ts updated for production
- [x] Security headers added
- [x] Error boundaries created
- [x] SEO metadata optimized
- [x] Branding updated
- [x] ESLint errors fixed

---

## 🚀 Deployment Steps

### Step 1: Sign Up / Login to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

---

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Find `lapoelectioncart_frontend` in the list
4. Click "Import"

---

### Step 3: Configure Project

Vercel will auto-detect Next.js settings:

```
Framework Preset: Next.js
Build Command: next build (auto-detected)
Output Directory: .next (auto-detected)
Install Command: npm install (auto-detected)
Root Directory: ./ (leave as is)
```

**No changes needed!** ✅

---

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

#### Required Variables:

```
Name: NEXT_PUBLIC_API_BASE_URL
Value: https://your-backend.onrender.com
```

```
Name: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_live_RWGCaTq8yBUu1O
```

**Important:**

- Replace `your-backend.onrender.com` with your actual backend URL
- Use LIVE Razorpay key for production

---

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Watch the build logs
4. ✅ Deployment complete!

You'll get a URL like: `https://lapoelectioncart-frontend.vercel.app`

---

### Step 6: Add Custom Domain

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter: `lapoelectioncart.com`
4. Click "Add"

#### DNS Configuration:

Vercel will show you DNS records to add:

**Option A: Using Vercel Nameservers (Recommended)**

```
Update your domain registrar to use Vercel nameservers:
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Using A Records**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Wait 5-10 minutes for DNS propagation
6. SSL certificate will be automatically issued
7. ✅ Your site is live at lapoelectioncart.com!

---

## 🧪 Post-Deployment Testing

### 1. Basic Functionality

- [ ] Visit https://lapoelectioncart.com
- [ ] Check homepage loads
- [ ] Verify images load from Cloudinary
- [ ] Test navigation between pages

### 2. API Integration

- [ ] Test login/signup
- [ ] Check products load
- [ ] Test add to cart
- [ ] Verify checkout flow

### 3. SEO & Meta Tags

- [ ] View page source
- [ ] Verify title tag
- [ ] Check meta description
- [ ] Confirm OpenGraph tags

### 4. Performance

- [ ] Run Lighthouse audit
- [ ] Check mobile responsiveness
- [ ] Test page load speed

### 5. Security

- [ ] Verify HTTPS (green padlock)
- [ ] Check security headers
- [ ] Test on different browsers

---

## 🔧 Update Backend URL

After backend is deployed, update the environment variable:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Find `NEXT_PUBLIC_API_BASE_URL`
5. Click "Edit"
6. Update to: `https://your-actual-backend.onrender.com`
7. Click "Save"
8. Redeploy (Vercel will prompt you)

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)

1. Go to your project dashboard
2. Click "Analytics" tab
3. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Enable Vercel Speed Insights

Add to `src/app/layout.tsx`:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 🐛 Troubleshooting

### Build Fails

**Check:**

1. Build logs in Vercel dashboard
2. Verify all dependencies in package.json
3. Check for TypeScript errors
4. Verify environment variables

**Common Issues:**

- Missing environment variables
- TypeScript errors
- ESLint errors
- Missing dependencies

### Site Loads But API Calls Fail

**Check:**

1. Backend URL is correct
2. Backend is deployed and running
3. CORS is configured on backend
4. Environment variables are set

### Images Don't Load

**Check:**

1. Cloudinary URLs are correct
2. Image domains in next.config.ts
3. Network tab in browser dev tools

### Domain Not Working

**Check:**

1. DNS records are correct
2. Wait 24-48 hours for full propagation
3. Clear browser cache
4. Try incognito mode

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will:

1. Detect the push
2. Build automatically
3. Deploy to production
4. Send you a notification

---

## 📱 Preview Deployments

Every pull request gets a preview URL:

1. Create a branch
2. Make changes
3. Push to GitHub
4. Create pull request
5. Vercel creates preview URL
6. Test before merging

---

## ⚙️ Advanced Configuration

### Custom Build Command

If needed, update in Vercel dashboard:

```
Settings → General → Build & Development Settings
```

### Environment Variables Per Environment

Vercel supports:

- Production
- Preview
- Development

Set different values for each environment.

---

## 📊 Performance Optimization

### Automatic Optimizations by Vercel:

- ✅ Image optimization
- ✅ Code splitting
- ✅ Compression (Brotli/gzip)
- ✅ Edge caching
- ✅ Global CDN
- ✅ HTTP/2 & HTTP/3

### Manual Optimizations:

1. **Lazy Loading**

   - Already implemented with Next.js

2. **Font Optimization**

   - Using next/font (already configured)

3. **Bundle Analysis**
   ```bash
   npm install @next/bundle-analyzer
   ```

---

## 💰 Cost

### Vercel Hobby Plan (FREE):

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments
- ✅ Analytics
- ✅ Edge network

**Sufficient for your needs!**

### If You Need More:

- **Pro Plan:** $20/month
  - 1TB bandwidth
  - Better performance
  - Team features

---

## 🎉 Success!

Your frontend is now live at:

- ✅ https://lapoelectioncart.com
- ✅ HTTPS enabled
- ✅ Global CDN
- ✅ Auto-deployments
- ✅ Preview URLs

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/next.js/discussions

---

**Deployment Time:** ~10 minutes  
**Status:** ✅ Ready to Deploy  
**Next Step:** Go to https://vercel.com and import your project!

🚀 **Let's deploy!**
