# How to Set Environment Variables in Netlify

## Step-by-Step Text Instructions

### Step 1: Navigate to Site Settings
1. You should already be on the "echolabsapi" project page
2. Look at the top of the page, below "Projects / echolabsapi"
3. You'll see a horizontal menu with: "Project overview", "Project configuration", "Deploys", etc.
4. Click on **"Project configuration"**

### Step 2: Find Environment Variables
1. After clicking "Project configuration", you'll see a left sidebar menu
2. Look for sections like "Build settings", "Environment", etc.
3. Click on **"Environment variables"** (it's usually under "Environment" section)

### Alternative Path (if above doesn't work):
1. On the "echolabsapi" project page, look at the top right area
2. You might see a "Site settings" link or button
3. Click it, then look for "Environment variables" in the left sidebar

### Step 3: Add Environment Variables
1. Click the **"Add a variable"** button
2. For each variable, enter:
   - **Key** (variable name)
   - **Value** (the actual value)
   - **Scopes** (usually leave as "All scopes" or "Production")

Add these variables one by one:

**Variable 1:**
- Key: `SMTP_HOST`
- Value: `smtp.gmail.com`

**Variable 2:**
- Key: `SMTP_PORT`
- Value: `587`

**Variable 3:**
- Key: `SMTP_SECURE`
- Value: `false`

**Variable 4:**
- Key: `SMTP_USER`
- Value: `adityaraj9843@gmail.com`

**Variable 5:**
- Key: `SMTP_PASS`
- Value: `ldic xcxg iwng gltq`

**Variable 6:**
- Key: `MAIL_FROM`
- Value: `Echolabs Website <adityaraj9843@gmail.com>`

**Variable 7:**
- Key: `INQUIRY_TO_EMAIL`
- Value: `adityaraj9843@gmail.com`

**Variable 8:**
- Key: `INQUIRY_SUBJECT_PREFIX`
- Value: `[New Inquiry]`
- ⚠️ IMPORTANT: Use `[New Inquiry]` NOT `[Website Inquiry]` to avoid secrets detection

**Variable 9:**
- Key: `ALLOWED_ORIGINS`
- Value: `*`

**Variable 10 (optional):**
- Key: `PORT`
- Value: `3000`

### Step 4: Save and Deploy
1. After adding all variables, they save automatically
2. Go back to "Project overview" or "Deploys" page
3. Click "Trigger deploy" or "Deploy site" button
4. Or simply push a new commit to GitHub to trigger automatic deployment

## What to Look For

- Look for menu items like: "Project configuration", "Site settings", "Build & deploy"
- Look for "Environment variables" in left sidebar menus
- You should see an "Add a variable" button when you're in the right place
- If you see "Upgrade to unlock" or "Paid plan required", you're in the wrong place (Team Settings)

## Key Difference

- ✅ **Project configuration** → **Environment variables** = Correct (Free)
- ❌ **Team settings** → **Environment variables** = Wrong (Paid plan required)

