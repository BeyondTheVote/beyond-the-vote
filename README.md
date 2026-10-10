# Beyond the Vote campaign website

A fast, mobile-first, static campaign information website for AUB university elections.

The website does not collect personal information and does not include login, analytics, cookies, payments, or online voting. It uses only HTML, CSS, and vanilla JavaScript, so it can be hosted free on GitHub Pages.

## Website flow

1. `index.html` — campaign homepage
2. `faculties.html` — faculty selection
3. `candidates.html?faculty=msfea` — candidates for one faculty
4. `candidate.html?id=msfea-candidate-01` — one candidate’s full profile
5. `logo-options.html` — record of the logo exploration and selected direction

The selected campaign identity is **Option 02: Forward Wordmark**.

A matching 1200 × 630 social-sharing image is stored at `assets/logo/social-preview.png`. It will be connected to the Open Graph metadata after the final public GitHub Pages address is known.

The confirmed faculties are:

- MSFEA — Maroun Semaan Faculty of Engineering and Architecture
- OSB — Suliman S. Olayan School of Business
- FAFS — Faculty of Agricultural and Food Sciences, using the campaign name “FAFS First”

## Preview the website on your Mac

1. Open the project folder in Visual Studio Code.
2. Open **Terminal → New Terminal**.
3. Run:

   ```bash
   python3 -m http.server 8000
   ```

4. Open [http://localhost:8000](http://localhost:8000) in Safari, Chrome, or Firefox.
5. Stop the local server by returning to the terminal and pressing **Control + C**.

Opening the HTML files directly also works in most cases, but the local server is the more reliable way to test the same behavior users will see online.

## Add real candidate information

Open `js/data.js`. Each faculty has a `candidates` list. Replace each placeholder field:

```js
{
  id: "msfea-firstname-lastname",
  name: "Full Name",
  position: "USFC",
  designation: "Lead Candidate", // Use "" when no designation applies.
  image: "assets/candidates/firstname-lastname.webp",
  imageAlt: "Portrait of Full Name",
  statement: "Approved candidate profile statement."
}
```

Important:

- Keep every candidate `id` unique.
- Use lowercase letters and hyphens in IDs and image filenames.
- Do not remove commas between fields.
- Put candidate photographs in `assets/candidates/`.
- Candidate cards and profile links are generated automatically from this file.

To add or remove a faculty, add or remove one complete faculty object in the `faculties` list. No HTML changes are required.

## Prepare candidate photographs

For each photograph:

1. Crop it vertically to a 4:5 ratio.
2. Resize it to approximately 1200 × 1500 pixels.
3. Export it as WebP at about 75–85% quality.
4. Aim to keep it below 300 KB.
5. Use a descriptive lowercase filename such as `firstname-lastname.webp`.

If an image is absent or fails to load, the website automatically displays a branded faculty placeholder instead of a broken image.

## Test on a phone

The easiest beginner-friendly method is to publish a temporary GitHub Pages version and open its URL on the phone. Before sharing it:

- Check the homepage in portrait orientation.
- Open all three faculty cards.
- Open at least one candidate profile from every faculty.
- Confirm the back buttons work.
- Confirm names and campaign messages are readable without zooming.
- Confirm photographs are sharp but load quickly on mobile data.
- Test once on an iPhone and once on an Android phone if both are available.

## Publish free with GitHub Pages

### 1. Create the repository

On GitHub, create a new public repository such as `election-website`. Do not add a README or `.gitignore` on GitHub because this folder already contains the project.

### 2. Upload from the Mac terminal

Replace `YOUR-USERNAME` with your GitHub username:

```bash
git init
git add .
git commit -m "Build Beyond the Vote campaign website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/election-website.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder.
5. Click **Save**.

GitHub will provide a URL similar to:

```text
https://YOUR-USERNAME.github.io/election-website/
```

The website uses relative links, so it works correctly inside that repository subdirectory.

## QR code

Do not print the final QR code until the GitHub Pages address is confirmed and the site has been tested on that exact URL. Once the public address is final, a print-ready SVG and high-resolution PNG can be generated and tested on both iOS and Android.

## Project structure

```text
.
├── index.html
├── faculties.html
├── candidates.html
├── candidate.html
├── logo-options.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── main.js
├── assets/
│   ├── candidates/
│   └── logo/
└── README.md
```

## Browser support

The site targets current versions of Safari, Chrome, and Firefox. It respects reduced-motion preferences, supports keyboard navigation, and includes semantic headings and accessible image text.
