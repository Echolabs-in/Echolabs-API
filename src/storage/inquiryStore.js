const fs = require("node:fs/promises");
const path = require("node:path");

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

let writeQueue = Promise.resolve();

async function appendInquiry(inquiry) {
  // Serialize writes inside this process to avoid corrupting JSON.
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });

    const existing = await readJsonArraySafe(INQUIRIES_FILE);
    existing.push(inquiry);
    await fs.writeFile(INQUIRIES_FILE, JSON.stringify(existing, null, 2), "utf8");
  });

  return writeQueue;
}

async function readJsonArraySafe(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err && (err.code === "ENOENT" || err.code === "ENOTDIR")) return [];
    // If JSON is corrupted or unreadable, fail loudly to avoid losing data.
    throw err;
  }
}

module.exports = { appendInquiry, INQUIRIES_FILE };


