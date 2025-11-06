# Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] All tests passing
- [ ] No ESLint errors
- [ ] Build completes successfully (`npm run build`)
- [ ] Code reviewed and approved

### Environment Variables
- [ ] `NEXT_PUBLIC_API_BASE_URL` set to production backend URL
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID` set to LIVE key (not test key)
- [ ] All environment variables documented in `.env.example`

### Backend Integration
- [ ] Backend API is deployed and accessible
- [ ] Backend CORS configured for frontend domain
- [ ] API endpoints tested and working
- [ ] Authentication flow tested

### Content & Assets
- [ ] All images optimized
- [ ] All content verified
- [ ] SEO metadata configured

### Security
- [ ] No sensitive data in code
- [ ] API keys stored as environment variables
- [ ] HTTPS enabled
- [ ] Security headers configured

## Deployment Steps

### Vercel Deployment
1. [ ] Push code to GitHub
2. [ ] Import project in Vercel
3. [ ] Configure environment variables
4. [ ] Deploy
5. [ ] Verify deployment URL

### Post-Deployment Verification
- [ ] Homepage loads correctly
- [ ] Authentication works
- [ ] Cart functionality works
- [ ] Payment flow works (test with small amount)
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Performance acceptable (Lighthouse score)

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Monitor server logs
- [ ] Check for console errors

### Documentation
- [ ] Update README with production URL
- [ ] Document any deployment-specific configurations
- [ ] Update API documentation if needed

### Communication
- [ ] Notify team of deployment
- [ ] Update stakeholders
- [ ] Announce to users if applicable

## Rollback Plan

If issues occur:
1. Revert to previous deployment in Vercel
2. Check error logs
3. Fix issues locally
4. Test thoroughly
5. Redeploy

## Support

- Vercel Dashboard: https://vercel.com/dashboard
- Backend Status: [Your backend URL]/health
- Documentation: See VERCEL_DEPLOYMENT_GUIDE.md
