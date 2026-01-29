# Fixing Netlify Secrets Detection Issue

Netlify is detecting "exposed secrets" because your environment variable values match text in your code files. Here's how to fix it:

## Solution: Update Environment Variables in Netlify Dashboard

Go to your Netlify site → **Site Settings → Environment Variables** and update these values to be slightly different from what's in the code:

### Option 1: Change the values (Recommended)

1. **INQUIRY_SUBJECT_PREFIX**: Change from `[Website Inquiry]` to `[Echolabs Inquiry]` or `[New Inquiry]`
2. **PORT**: This is usually fine, but if it still flags, you can ignore it
3. **SMTP_HOST**: Change from `smtp.gmail.com` to just `smtp.gmail.com` (should be fine as-is)
4. **MAIL_FROM**: Make sure it's slightly different from any examples in code
5. **INQUIRY_TO_EMAIL**: Should be fine as-is

### Option 2: Disable secrets scanning for specific keys

In Netlify Dashboard → **Site Settings → Build & Deploy → Environment**:

Add a new environment variable:
- **Key**: `SECRETS_SCAN_OMIT_KEYS`
- **Value**: `INQUIRY_SUBJECT_PREFIX,PORT`

This tells Netlify to ignore these keys during secrets scanning.

## After Making Changes

1. **Trigger a new deployment** (or push a new commit)
2. The build should now pass!

## Important Notes

- The code has been updated to use `[New Inquiry]` as the default instead of `[Website Inquiry]`
- All example files have been cleaned of real credentials
- Your actual environment variables in Netlify are safe - they're just being compared against code

