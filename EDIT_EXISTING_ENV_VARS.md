# Editing Existing Environment Variables in Netlify

## The Issue
You're getting "Environment variable SMTP_HOST already exists" because you've already added the variables. You need to **EDIT** them, not create new ones.

## How to Edit Existing Variables

### Step 1: Find Your Existing Variables
1. You're already in the "Environment variables" page
2. You should see a list/table of existing variables you've already added
3. Look for variables like: SMTP_HOST, SMTP_USER, INQUIRY_SUBJECT_PREFIX, etc.

### Step 2: Edit Each Variable
For each variable in the list:

1. **Find the variable** (e.g., `INQUIRY_SUBJECT_PREFIX`)
2. **Click on it** or look for an **"Edit"** button/icon next to it
3. **Change the Value** to match what's needed:

### Variables That Need Editing:

**INQUIRY_SUBJECT_PREFIX:**
- Current value might be: `[Website Inquiry]`
- Change it to: `[New Inquiry]`
- This is the most important one to fix the secrets detection issue!

**SMTP_HOST:**
- Should be: `smtp.gmail.com`
- If it's already correct, leave it

**SMTP_USER:**
- Should be: `adityaraj9843@gmail.com`
- If it's already correct, leave it

**SMTP_PASS:**
- Should be: `ldic xcxg iwng gltq`
- If it's already correct, leave it

**MAIL_FROM:**
- Should be: `Echolabs Website <adityaraj9843@gmail.com>`
- If it's already correct, leave it

**INQUIRY_TO_EMAIL:**
- Should be: `adityaraj9843@gmail.com`
- If it's already correct, leave it

**ALLOWED_ORIGINS:**
- Should be: `*`
- If it's already correct, leave it

### Step 3: Save Changes
- After editing each variable, click **"Save"** or **"Update"**
- The changes save automatically in some cases

### Step 4: Check All Variables Exist
Make sure you have ALL of these variables:
- SMTP_HOST
- SMTP_PORT
- SMTP_SECURE
- SMTP_USER
- SMTP_PASS
- MAIL_FROM
- INQUIRY_TO_EMAIL
- INQUIRY_SUBJECT_PREFIX (⚠️ Edit this one!)
- ALLOWED_ORIGINS
- PORT (optional)

### Step 5: Redeploy
After editing `INQUIRY_SUBJECT_PREFIX` to `[New Inquiry]`:
1. Go back to "Deploys" page
2. Click "Trigger deploy" → "Deploy site"
3. Or push a new commit to GitHub

## Most Important Fix
**Change `INQUIRY_SUBJECT_PREFIX` from `[Website Inquiry]` to `[New Inquiry]`**
This will fix the secrets detection error!

