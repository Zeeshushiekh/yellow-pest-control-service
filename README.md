# Yellow Pest Control Services — Website

A single-page static website (HTML/CSS/JS, no build step needed).

## Files
- `index.html` — the entire website
- `vercel.json` — deployment config for Vercel
- `assets/logo-icon.png` — Yellow Pest Control Services logo icon (used in nav & footer)
- `assets/logo-full.png` — full logo with wordmark (spare, for use elsewhere e.g. letterheads)

## ⚙️ Enquiry Form Backend Setup (REQUIRED — 5 minutes)

The "Book your pest inspection" form is wired to a **working backend** (`/api/enquiry.js`, a Vercel Serverless Function) that emails every submission to **infoyellowpest@gmail.com** using **Resend** (free email API, no credit card required).

### Step-by-step setup

1. **Sign up at Resend**: go to https://resend.com → Sign up (you can use `infoyellowpest@gmail.com`).
2. In the Resend dashboard, go to **API Keys → Create API Key**. Copy the key (starts with `re_...`).
3. **Deploy this project to Vercel** (see deployment steps below) — do this first if you haven't.
4. In your Vercel project, go to **Settings → Environment Variables**.
5. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** *(paste the key from Resend)*
   - Apply to: Production, Preview, Development (select all)
6. Click **Save**, then go to **Deployments** and click **Redeploy** (so the function picks up the new environment variable).
7. That's it. The enquiry form now sends real emails to `infoyellowpest@gmail.com` whenever a customer submits it.

> Note: By default, Resend's free tier sends from `onboarding@resend.dev`. This works immediately for receiving enquiries. If you want emails to appear as sent from your own domain (e.g. `enquiries@yellowpestcontrol.com`), verify a domain in Resend and update the `from` field in `api/enquiry.js`.

### Testing locally
This API route only runs when deployed on Vercel (or via `vercel dev`). If you open `index.html` directly as a file, the form will show an error message — that's expected. Once deployed on Vercel with the environment variable set, it works fully.

### Alternative: Formspree (if you'd rather not use Resend/Vercel functions)
1. Sign up at https://formspree.io with `infoyellowpest@gmail.com`.
2. Create a new form, copy the endpoint (e.g. `https://formspree.io/f/abcd1234`).
3. In `index.html`, change the form tag from:
   ```html
   <form id="enquiryForm" action="/api/enquiry" method="POST">
   ```
   to:
   ```html
   <form id="enquiryForm" action="https://formspree.io/f/abcd1234" method="POST">
   ```
4. Verify the confirmation email Formspree sends to `infoyellowpest@gmail.com`.

## Deploy to Vercel (Step by Step)

### Option A: Vercel Website (easiest, no coding tools needed)
1. Go to https://vercel.com and sign up / log in (you can use GitHub, GitLab, or email).
2. Click **"Add New..." → "Project"**.
3. Choose **"Deploy without Git"** (or drag-and-drop option) — you'll see an area that says "Import" or a drag-and-drop box.
4. Drag the whole `yellow-pest` folder (containing `index.html` and `vercel.json`) into the upload box.
5. Click **Deploy**.
6. Wait ~30 seconds. Vercel gives you a live URL like `https://yellow-pest-xxxx.vercel.app`.
7. (Optional) Go to **Project → Settings → Domains** to add your own custom domain (e.g. yellowpestcontrol.com).

### Option B: Using GitHub (recommended for future edits)
1. Create a new repository on GitHub (e.g. `yellow-pest-website`).
2. Upload `index.html` and `vercel.json` to that repo (use "Add file → Upload files" on GitHub's website).
3. Go to https://vercel.com → **"Add New..." → "Project"**.
4. Click **"Import Git Repository"** and select your `yellow-pest-website` repo.
5. Leave all settings as default (Framework Preset: "Other").
6. Click **Deploy**.
7. Your site goes live at a `.vercel.app` URL. Any future edits you push to GitHub auto-deploy.

### Option C: Using Vercel CLI (if you have a computer with Node.js)
```bash
npm install -g vercel
cd yellow-pest
vercel login
vercel --prod
```
Follow the prompts (accept defaults). It will give you a live URL.

## Customizing
- Edit text, phone numbers, address directly inside `index.html`.
- Colors/fonts are defined at the top of the `<style>` block under `:root`.
- The map uses a free Google Maps embed (no API key needed) — search query can be edited in the `iframe src`.
- WhatsApp button links to `https://wa.me/918859956356` — change the number if needed.
- Replace the "Y" logo box with an actual logo image by swapping the `.logo` divs with `<img src="logo.png">`.

## Notes
- Fully responsive (mobile, tablet, desktop).
- No backend — the enquiry form currently shows a confirmation alert. To actually receive form submissions, connect it to a service like Formspree, Google Forms, or EmailJS (can be added later).
