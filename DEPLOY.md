# Deployment Guide - Netlify

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Netlify CLI** (optional, for CLI deployment):
   ```bash
   npm install -g netlify-cli
   ```

## Step-by-Step Deployment

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Go to Netlify Dashboard**:
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account and select the `Echolabs-API` repository

3. **Configure Build Settings**:
   - **Build command**: `npm install` (or leave empty, Netlify auto-detects)
   - **Publish directory**: Leave empty (we're using functions, not static files)
   - **Functions directory**: `netlify/functions`

4. **Set Environment Variables**:
   - Go to Site Settings → Environment Variables
   - Add each variable from your `.env` file:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=adityaraj9843@gmail.com
     SMTP_PASS=ldic xcxg iwng gltq
     MAIL_FROM=Echolabs Website <adityaraj9843@gmail.com>
     INQUIRY_TO_EMAIL=adityaraj9843@gmail.com
     INQUIRY_SUBJECT_PREFIX=[Website Inquiry]
     ALLOWED_ORIGINS=*
     ```

5. **Deploy**:
   - Click "Deploy site"
   - Wait for deployment to complete
   - Your API will be available at: `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Login to Netlify**:
   ```bash
   netlify login
   ```

2. **Initialize Netlify**:
   ```bash
   cd D:\EchoLabs\APIS\Echolabs-API
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Follow the prompts

3. **Set Environment Variables**:
   ```bash
   netlify env:set SMTP_HOST "smtp.gmail.com"
   netlify env:set SMTP_PORT "587"
   netlify env:set SMTP_SECURE "false"
   netlify env:set SMTP_USER "adityaraj9843@gmail.com"
   netlify env:set SMTP_PASS "ldic xcxg iwng gltq"
   netlify env:set MAIL_FROM "Echolabs Website <adityaraj9843@gmail.com>"
   netlify env:set INQUIRY_TO_EMAIL "adityaraj9843@gmail.com"
   netlify env:set INQUIRY_SUBJECT_PREFIX "[Website Inquiry]"
   netlify env:set ALLOWED_ORIGINS "*"
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

## Testing Your Deployment

Once deployed, test your API:

1. **Health Check**:
   ```bash
   curl https://your-site-name.netlify.app/health
   ```

2. **Submit Inquiry**:
   ```bash
   curl -X POST https://your-site-name.netlify.app/api/inquiry \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "email": "test@example.com",
       "company": "Test Company",
       "projectDetails": "Testing deployment",
       "helpWith": "Creating A New Website / Full-Redesign",
       "budget": "$25-50k",
       "agreeToEmailCommunication": true
     }'
   ```

## Important Notes

⚠️ **File Storage Limitation**: 
- Netlify Functions are stateless
- The `data/inquiries.json` file will NOT persist between function invocations
- Consider using a database (MongoDB, PostgreSQL) or external storage for production

⚠️ **Cold Starts**: 
- Netlify Functions may have cold start delays (1-2 seconds)
- This is normal for serverless functions

## Alternative Deployment Options

### Vercel (Better for Express APIs)
```bash
npm install -g vercel
vercel
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Render
1. Connect GitHub repo at [render.com](https://render.com)
2. Select "Web Service"
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

