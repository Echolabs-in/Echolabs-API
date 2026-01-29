const serverless = require("serverless-http");
const app = require("../../src/index");

// Export the Express app wrapped in serverless-http for Netlify Functions
exports.handler = serverless(app, {
  binary: ["image/*", "application/pdf"],
});

