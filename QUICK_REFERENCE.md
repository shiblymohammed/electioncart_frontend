# Quick Reference Guide

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Development
# All development tools ready
```

## Project Structure

```
suburbia/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (with-header)/     # Layout group with header
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── profile/       # User profile
│   │   │   └── layout.tsx     # Shared layout
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── AuthModal.tsx      # Authentication modal
│   │   ├── HeroSection.tsx    # Hero section
│   │   ├── PackagesSection.tsx
│   │   ├── CampaignsSection.tsx
│   │   └── ...
│   ├── lib/                   # Utilities
├── public/                    # Static files
└── .env.local                 # Local environment
```

## Environment Variables

### Development (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY
```

## API Integration

### Base Configuration
Located in `src/lib/api.ts` (or similar)

### Common Endpoints
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/campaigns/` - Get campaigns
- `GET /api/packages/` - Get packages
- `POST /api/cart/add/` - Add to cart
- `POST /api/orders/create/` - Create order

## Component Patterns

### Page Component
```tsx
export default function Page() {
  return (
    <div>
      {/* Content */}
    </div>
  );
}
```

### Client Component
```tsx
'use client';

import { useState } from 'react';

export default function ClientComponent() {
  const [state, setState] = useState();
  // ...
}
```

## Styling

### Tailwind Classes
```tsx
<div className="flex items-center justify-center p-4 bg-blue-500">
  {/* Content */}
</div>
```

### Responsive Design
```tsx
<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive text */}
</div>
```

## Troubleshooting

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port in Use
```bash
npm run dev -- -p 3001
```

### API Connection Issues
1. Check backend is running
2. Verify `NEXT_PUBLIC_API_BASE_URL`
3. Check browser console for errors
4. Verify CORS settings in backend

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

- [Razorpay Docs](https://razorpay.com/docs/)
