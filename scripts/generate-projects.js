#!/usr/bin/env node
/**
 * Regenerate assets/js/projects-data.js from assets/projectphotos/
 * Run: node scripts/generate-projects.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PHOTOS_DIR = path.join(ROOT, "assets/projectphotos");
const OUT_FILE = path.join(ROOT, "assets/js/projects-data.js");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const TITLE_MAP = {
  "Electrical Installtions": "Electrical Installations",
  "Gen set testing": "Generator Set Testing",
  "Cabling work A&A": "Cabling Work A&A",
  "Chiller plant room": "Chiller Plant Room",
  "M&E inspection Electrical Transformer room":
    "M&E Inspection — Electrical Transformer Room",
};

const SLUG_MAP = {
  "A&A electrical switch board inspection": "aanda-electrical-switchboard-inspection",
  "A&A fit out work": "aanda-fit-out-work",
  "A&A switch gears upgrade": "aanda-switch-gears-upgrade",
  "Gen set testing": "generator-set-testing",
  "Cabling work A&A": "cabling-work-aa",
  "Chiller plant room": "chiller-plant-room",
};

const CATEGORY_MAP = {
  "A&A electrical switch board inspection": "A&A Works",
  "A&A fit out work": "Fit-out",
  "A&A switch gears upgrade": "A&A Works",
  "ACMV Work": "ACMV",
  "Cabling work A&A": "A&A Works",
  "Chiller plant room": "ACMV",
  "Cooling towers": "ACMV",
  "DFMA": "DFMA",
  "Electrical Installtions": "Electrical",
  "Electrical main distribution center": "Electrical",
  "Electrical provision work": "Electrical",
  "Gen set testing": "Electrical",
  "M&E inspection Electrical Transformer room": "Inspection",
  "Plumbing": "Plumbing",
  "Underground pipe work": "Plumbing",
};

const ROOT_FILE_SKIP = /^(\.ds_store|chatgpt|whatsapp)/i;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function displayTitle(name) {
  return TITLE_MAP[name] || name;
}

function categoryFor(key) {
  return CATEGORY_MAP[key] || "MEP";
}

function slugFor(key, title) {
  return SLUG_MAP[key] || slugify(title);
}

function descriptionFor(title, category) {
  return `MEP engineering and on-site coordination for ${title} — ${category.toLowerCase()} works delivered across Singapore with technical compliance and professional oversight.`;
}

function listImagesInDir(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `assets/projectphotos/${path.basename(dir)}/${f}`.replace(/\\/g, "/"));
}

const projects = [];
const entries = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true });

for (const entry of entries) {
  if (entry.isDirectory()) {
    const images = listImagesInDir(path.join(PHOTOS_DIR, entry.name));
    if (!images.length) continue;
    const title = displayTitle(entry.name);
    const category = categoryFor(entry.name);
    projects.push({
      slug: slugFor(entry.name, title),
      title,
      category,
      description: descriptionFor(title, category),
      images,
    });
    continue;
  }

  if (!IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) continue;
  if (ROOT_FILE_SKIP.test(entry.name)) continue;

  const rel = `assets/projectphotos/${entry.name}`;
  const base = path.basename(entry.name, path.extname(entry.name));
  const title = displayTitle(base);
  const category = categoryFor(base);
  projects.push({
    slug: slugFor(base, title),
    title,
    category,
    description: descriptionFor(title, category),
    images: [rel],
  });
}

projects.sort((a, b) => a.title.localeCompare(b.title));

const output = `const NOVA_PROJECTS = ${JSON.stringify(projects, null, 2)};\n`;
fs.writeFileSync(OUT_FILE, output);
console.log(`Wrote ${projects.length} projects to ${path.relative(ROOT, OUT_FILE)}`);
