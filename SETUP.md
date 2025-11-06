# Election Cart Frontend - Setup Guide

## Quick Setup

### 1. Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd election-cart-frontend

# Option A: Use setup script (recommended)
# On Linux/Mac:
chmod +x init-repo.sh
./init-repo.sh

# On Windows:
init-repo.bat

# Option B: Manual setup
npm install
cp .env.example .env.local
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your values:

```env
# Backend API URL (local development)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Razorpay Test Key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
```

### 4. Backend Setup

This frontend requires the backend API to be running. 

**Backend Repository:** [Link to your backend repo]

Make sure the backend is running on `http://localhost:8000` or update the `NEXT_PUBLIC_API_BASE_URL` accordingly.

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Production Deployment

### Environment Variables

For production, set these in your hosting platform (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

## Troubleshooting

### Port Already in Use

If port 3000 is busy:

```bash
npm run dev -- -p 3001
```

### API Connection Issues

- Verify backend is running
- Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Check CORS settings in backend

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Additional Resources

- [README.md](./README.md) - Project overview
- [FRONTEND_PRODUCTION_READINESS_PLAN.md](./FRONTEND_PRODUCTION_READINESS_PLAN.md) - Production checklist
- [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) - Deployment guide
