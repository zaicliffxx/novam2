# Nova M2

Multi-page site for **NOVA M2 PTE LTD** — Singapore MEP Engineering Consultancy and Project Management.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About Us | `about.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| Project detail | `project.html?slug=…` |
| Contact Us | `contact.html` |

## Project photos

Photos live in `assets/projectphotos/`. Metadata is in `assets/js/projects-data.js`. After renaming or adding folders:

```bash
node scripts/generate-projects.js
```

## Local preview

```bash
python3 -m http.server 8080
```

## Deploy

Static site — publish directory is `.` (root). Netlify deploys on push to `main`.

Enquiries: **sales@novam2.com**. Set Netlify **Forms → notifications** to the same address.
