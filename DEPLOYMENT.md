# Vercel Deployment Guide

## Overview

This repository is a static single-page application built with React, TypeScript, and Vite. It is fully deployable on Vercel as a static site with SPA route fallback.

## Production Readiness Checklist

- Build succeeds with `npm run build`
- SPA fallback is configured in `vercel.json`
- Security headers are configured in `vercel.json`
- Node runtime is pinned to `22.x` in `package.json`
- Public environment variables are documented in `.env.example`

## Required Environment Variables

Set these in Vercel for Production and Preview environments:

- `VITE_EMAILJS_SERVICE_ID`: EmailJS service identifier used by the contact form
- `VITE_EMAILJS_TEMPLATE_ID`: EmailJS template identifier used by the contact form
- `VITE_EMAILJS_PUBLIC_KEY`: EmailJS public key used by the client-side form submission

## Vercel Project Settings

- **Framework Preset:** Vite
- **Root Directory:** `portfolio-3d`
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node.js Version:** `22.x`

## Deployment Steps

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Set the Root Directory to `portfolio-3d`.
4. Confirm the build settings above.
5. Add the environment variables listed above.
6. Deploy the project.

## SPA Routing

Direct navigation to nested routes such as `/projects/:id` must resolve correctly on refresh. This is handled by the rewrite fallback in `vercel.json`.

## Security Headers

The `vercel.json` file includes:

- Content Security Policy
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cross-Origin-Opener-Policy
- Cross-Origin-Resource-Policy
- Cache-Control for static assets

## Custom Domain

1. Open the project in Vercel.
2. Go to **Settings** -> **Domains**.
3. Add your apex or subdomain.
4. Update DNS records as instructed by Vercel.
5. Wait for automatic certificate provisioning.

## Rollback

- Open **Deployments** in Vercel.
- Select the last known good deployment.
- Promote it to Production.

## Redeploy

- Open the target deployment in Vercel.
- Select **Redeploy** to rebuild the same commit.

## Verification After Deployment

- Home page loads on desktop and mobile
- `/projects` loads correctly
- `/projects/:id` loads and refreshes correctly
- Contact form validates and submits when EmailJS variables are set
- No console errors in production
- Images, 3D scenes, and navigation work as expected

## Notes

- The app uses client-side routing, so `vercel.json` must remain committed.
- Keep `VITE_*` variables limited to public client-safe values only.
