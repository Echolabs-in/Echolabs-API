# Echolabs-API

Express API for website inquiry form with SMTP email delivery.

## Features

- Inquiry form API endpoint (`POST /api/inquiry`)
- SMTP email delivery via Gmail
- Local JSON storage for inquiries
- Mobile number with country code support
- CORS enabled for all origins

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp env.example .env
```

3. Update `.env` with your SMTP credentials (Gmail app password)

4. Run development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /health
```

### Submit Inquiry
```
POST /api/inquiry
Content-Type: application/json

{
  "firstName": "John",
  "email": "john@example.com",
  "mobileNumber": "+1234567890",  // Optional
  "company": "Acme Corp",
  "projectDetails": "Need a new website",
  "helpWith": "Creating A New Website / Full-Redesign",
  "budget": "$25-50k",
  "agreeToEmailCommunication": true
}
```

## Deployment

### Netlify

1. Install Netlify CLI (if not already installed):
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

4. Set environment variables in Netlify Dashboard:
   - Go to Site Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `SMTP_SECURE`
     - `SMTP_USER`
     - `SMTP_PASS`
     - `MAIL_FROM`
     - `INQUIRY_TO_EMAIL`
     - `INQUIRY_SUBJECT_PREFIX`
     - `ALLOWED_ORIGINS`

### Alternative: Vercel (Recommended for Express APIs)

Vercel is better suited for Express APIs:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel Dashboard

### Alternative: Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Set environment variables in Railway Dashboard

## Environment Variables

See `env.example` for all required environment variables.

## Project Structure

```
├── src/
│   ├── index.js           # Express app entry point
│   ├── routes/
│   │   └── inquiry.js     # Inquiry form route
│   ├── services/
│   │   └── mailer.js      # SMTP email service
│   └── storage/
│       └── inquiryStore.js # JSON file storage
├── netlify/
│   └── functions/
│       └── server.js      # Netlify function wrapper
├── data/
│   └── inquiries.json     # Stored inquiries (gitignored)
├── netlify.toml           # Netlify configuration
└── package.json

```
