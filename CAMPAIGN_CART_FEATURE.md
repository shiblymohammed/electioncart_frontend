# Campaign Add to Cart Feature

## Overview
Added "Add to Cart" functionality for campaigns, allowing users to add campaigns to their shopping cart from both the campaigns section and campaign detail pages.

## Changes Made

### 1. Campaign Detail Page (`/campaign/[id]/page.tsx`)
- ✅ Imported `useCart` hook from CartContext
- ✅ Replaced placeholder alert with actual `addToCart(campaign, "campaign")` call
- ✅ Cart modal automatically opens when item is added

### 2. Campaigns Section (`CampaignsSection.tsx`)
- ✅ Imported `useCart` hook
- ✅ Added "Add to Cart" button alongside "View Details" button
- ✅ Buttons are responsive (stack on mobile, side-by-side on desktop)
- ✅ Button colors match the campaign theme for visual consistency

## Features

### Campaign Detail Page
- Large "Add to Cart" button at the top of the details section
- Clicking adds the campaign to cart and opens the cart modal
- User can continue browsing or proceed to checkout

### Campaigns Section (Homepage)
- Each campaign card now has two buttons:
  - **Add to Cart** - Adds campaign to cart immediately
  - **View Details** - Navigates to full campaign details
- Buttons are styled to match each campaign's theme color
- Responsive layout: buttons stack on mobile, side-by-side on desktop

## User Flow

1. **From Homepage:**
   - User sees campaign cards with "Add to Cart" button
   - Click "Add to Cart" → Item added, cart modal opens
   - OR click "View Details" → Navigate to detail page

2. **From Detail Page:**
   - User views full campaign information
   - Click "Add to Cart" → Item added, cart modal opens
   - User can adjust quantity in cart modal
   - Proceed to checkout when ready

## Technical Details

- Uses existing `CartContext` infrastructure
- Campaign items are stored with type `"campaign"`
- Cart persists in localStorage
- Duplicate items increment quantity instead of creating new entries
- Cart modal shows automatically when items are added

## Testing Checklist

- ✅ Add campaign from homepage campaigns section
- ✅ Add campaign from detail page
- ✅ Add same campaign multiple times (quantity increments)
- ✅ Cart modal opens automatically
- ✅ Cart persists across page refreshes
- ✅ Responsive layout works on mobile and desktop
- ✅ Button colors match campaign themes
