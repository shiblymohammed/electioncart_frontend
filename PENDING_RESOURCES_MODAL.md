# Pending Resources Modal Implementation

## Overview
A persistent modal that automatically appears when a logged-in user has orders with pending resource uploads. The modal shows **every time** on page refresh and login until all resources are uploaded.

## Features
- ✅ Shows automatically when user has pending resource uploads
- ✅ Appears on **every page refresh** and **every login**
- ✅ "Hide" button to temporarily dismiss (only for current session)
- ✅ "Upload Now" button redirects to the upload page
- ✅ No hydration mismatch errors (client-only rendering)
- ✅ Automatically disappears when all resources are uploaded

## How It Works

### 1. Modal Component (`PendingResourcesModal.tsx`)
- Uses `useEffect` with `isMounted` state to prevent hydration mismatches
- Checks for pending resources on **every mount** (refresh, navigation, login)
- Fetches user orders and looks for items with `resources_uploaded: false`
- Shows modal immediately if pending resources are found

### 2. Integration
- Added to `(with-header)/layout.tsx` so it appears on all pages
- Automatically checks on every page load when user is authenticated

### 3. Persistent Behavior
- Modal shows on **every page refresh** if resources are pending
- Modal shows on **every login** if resources are pending
- "Hide" button only dismisses for current session (until next refresh/navigation)
- No localStorage persistence - always checks fresh on mount

### 4. Upload Flow
- "Upload Now" button redirects to `/orders/{orderId}/upload`
- After successful upload, modal automatically stops showing
- If user has multiple orders, modal shows for the first pending order

## Usage
The modal works automatically - no manual integration needed. It will:
1. ✅ Show **every time** user logs in with pending resources
2. ✅ Show **every time** user refreshes the page with pending resources
3. ✅ Show on navigation between pages
4. ✅ Automatically disappear when all resources are uploaded
5. ✅ Can be temporarily dismissed with "Hide" button (reappears on refresh)

## Technical Details
- **Hydration Fix**: Uses `isMounted` state to ensure rendering only happens on client
- **Performance**: Only checks orders when user is authenticated
- **Persistence**: No localStorage - checks fresh on every mount
- **UX**: Smooth animations and clear call-to-action buttons
