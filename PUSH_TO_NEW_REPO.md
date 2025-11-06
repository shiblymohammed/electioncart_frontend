# How to Push Suburbia to New Repository

## Step-by-Step Guide

### 1. Create New GitHub Repository

1. Go to https://github.com/new
2. Repository name: `election-cart-frontend`
3. Description: "Modern Next.js e-commerce platform for election campaign materials"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Prepare Local Folder

Open terminal/command prompt in the **suburbia** folder:

```bash
# Navigate to suburbia folder
cd suburbia

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Election Cart Frontend standalone repository"
```

### 3. Connect to GitHub

Replace `yourusername` with your actual GitHub username:

```bash
# Add remote origin
git remote add origin https://github.com/yourusername/election-cart-frontend.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 4. Verify Upload

1. Go to your GitHub repository
2. Check that all files are uploaded
3. Verify README.md displays correctly

### 5. Update Repository Settings

On GitHub repository page:

1. **About section** (top right):
   - Description: "Modern Next.js e-commerce platform for election campaign materials"
   - Website: (add after Vercel deployment)
   - Topics: `nextjs`, `react`, `typescript`, `ecommerce`, `tailwindcss`, `razorpay`

2. **Settings > General**:
   - Enable Issues
   - Enable Discussions (optional)

### 6. Update Files with Actual URLs

After repository is created, update these files:

#### README.md
```markdown
# Line 95 - Update backend repo URL
**Backend Repository:** https://github.com/yourusername/election-cart-backend
```

#### package.json
```json
// Line 6 - Update repository URL
"repository": {
  "type": "git",
  "url": "https://github.com/yourusername/election-cart-frontend.git"
}
```

#### SETUP.md
```bash
# Line 7 - Update clone URL
git clone https://github.com/yourusername/election-cart-frontend.git
```

Then commit and push these updates:

```bash
git add README.md package.json SETUP.md
git commit -m "docs: update repository URLs"
git push
```

### 7. Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: **/** (leave as is)
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY
   ```

6. Click "Deploy"

### 8. Update Backend CORS

After Vercel deployment, update backend CORS settings:

```python
# In backend settings.py
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
    "http://localhost:3000",  # for local development
]
```

### 9. Final Verification

- [ ] Repository is public/private as intended
- [ ] README displays correctly
- [ ] All files are present
- [ ] .env.local is NOT in repository (should be in .gitignore)
- [ ] Vercel deployment successful
- [ ] Frontend can connect to backend
- [ ] All features working

## Troubleshooting

### "Repository already exists"
- Choose a different name or delete the existing repository

### "Permission denied"
- Check your GitHub authentication
- Use HTTPS URL or set up SSH keys

### "Large files warning"
- Check if node_modules is being committed (should be in .gitignore)
- Run: `git rm -r --cached node_modules`

### "Push rejected"
- Make sure you're pushing to the correct repository
- Check if branch protection rules are enabled

## Quick Commands Reference

```bash
# Check git status
git status

# View remote URL
git remote -v

# Change remote URL
git remote set-url origin https://github.com/yourusername/new-repo.git

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

## Need Help?

- See [SETUP.md](./SETUP.md) for setup instructions
- See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for deployment
- See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for common commands

---

**Ready to push! Follow the steps above.** 🚀
