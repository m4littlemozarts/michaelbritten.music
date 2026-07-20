# michaelbritten.music

Static, self-contained rebuild of `michaelbritten.music`, captured from the live site on July 19, 2026.

The site has no build step and no dependency on Super or Notion. All site-owned fonts, images, audio, icons, and downloadable PDFs are committed in `assets/`. The existing Tally contact form and YouTube embed remain external because they provide the live form and video behavior.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Pages

- `/`
- `/portfolio/`
- `/blog/`
- `/blog-database/`
- `/contact/`
- `/blog-database/harpejji-notation-system/`

## Hosting

The repository is structured for GitHub Pages. Publishing, the custom-domain `CNAME`, Cloudflare DNS changes, and Super cancellation are intentionally deferred until the local rebuild is approved.
