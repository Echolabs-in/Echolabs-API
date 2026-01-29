const serverless = require("serverless-http");
const path = require("path");

// Load environment variables (optional - Netlify provides them automatically)
try {
  require("dotenv").config();
} catch (err) {
  // Ignore - environment variables are available in Netlify
}

// Import the Express app using absolute path resolution
let app;
try {
  const appPath = path.resolve(__dirname, "../../src/index.js");
  app = require(appPath);
} catch (err) {
  console.error("Failed to load Express app:", err);
  throw err;
}

// Export the Express app wrapped in serverless-http for Netlify Functions
exports.handler = serverless(app, {
  binary: ["image/*", "application/pdf"],
});

