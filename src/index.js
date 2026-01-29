const path = require("node:path");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

// Load .env file only if it exists (for local development)
// In Netlify, environment variables are automatically available
try {
  dotenv.config({ path: path.join(process.cwd(), ".env") });
} catch (err) {
  // Ignore if .env doesn't exist (e.g., in Netlify)
}

const { inquiryRouter } = require("./routes/inquiry");

const app = express();

app.use(helmet());
app.use(express.json({ limit: "250kb" }));

const rawAllowedOrigins = process.env.ALLOWED_ORIGINS || "";
const allowAllOrigins = rawAllowedOrigins === "" || rawAllowedOrigins === "*";

if (allowAllOrigins) {
  // Allow all origins
  app.use(cors());
} else {
  const allowedOrigins = rawAllowedOrigins
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, cb) {
        if (!origin) return cb(null, true); // curl/postman
        if (allowedOrigins.length === 0) return cb(null, true);
        if (allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error(`CORS blocked for origin: ${origin}`));
      },
    }),
  );
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/inquiry", inquiryRouter);

// Basic error handler
app.use((err, _req, res, _next) => {
  const status = Number(err?.status) || 500;
  res.status(status).json({
    ok: false,
    error: status === 500 ? "Internal Server Error" : String(err?.message || err),
  });
});

// Export app for serverless (Netlify/Vercel)
module.exports = app;

// Only start server if running directly (not imported)
if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}


