const serverless = require("serverless-http");
const path = require("path");

// Load environment variables (optional - Netlify provides them automatically)
try {
  require("dotenv").config();
} catch (err) {
  // Ignore - environment variables are available in Netlify
}

// Set NODE_PATH to help with module resolution in Netlify Functions
// Netlify bundles everything to /var/task, so we need to help Node find modules
process.env.NODE_PATH = path.join(process.cwd(), "node_modules") + 
  (process.env.NODE_PATH ? path.delimiter + process.env.NODE_PATH : "");

// Try to require the app - Netlify bundles src/ to the function root
let app;
try {
  // First try: relative path from function location (after bundling)
  app = require("../../src/index");
} catch (err1) {
  try {
    // Second try: from project root (process.cwd() should be /var/task)
    const appPath = path.join(process.cwd(), "src", "index");
    app = require(appPath);
  } catch (err2) {
    // Third try: direct require assuming src is at root level after bundling
    app = require("./src/index");
  }
}

// Export the Express app wrapped in serverless-http for Netlify Functions
exports.handler = serverless(app, {
  binary: ["image/*", "application/pdf"],
});

