# Kerushan.com website

Static site: plain HTML, CSS and JavaScript. No build step needed.

## Structure

```
index.html          all pages (home, show, articles, resources, about, coffee, book), switched by the #hash in the URL
css/style.css       all styles
js/main.js          page switching, mobile menu, testimonials slider
assets/images/      backgrounds, portraits, comic strips, torn-paper edges, book artwork
```

## Run locally

Open the folder in VS Code and use the Live Server extension (right-click `index.html` > Open with Live Server).
Opening `index.html` by double-clicking also works.

## Push to GitHub

```
git init
git add .
git commit -m "Kerushan.com website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

To publish it, turn on GitHub Pages (repo Settings > Pages > Deploy from branch `main`, folder `/root`), or connect the repo to Netlify.

## Still to fill in

- Instagram, Pinterest and LinkedIn links in the footer: search for `[INSTAGRAM URL]`, `[PINTEREST URL]`, `[LINKEDIN URL]`
- Live studio audience sign-up link on the Online show page: `[LIVE AUDIENCE SIGN-UP URL]`
- Blog category links on the Articles page: `[CATEGORY URL]`
- Second guest for episode S01 E02 on the Online show page

The logo, YouTube thumbnails, podcast cover and article images load from kerushan.com and YouTube.
