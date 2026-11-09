# Max Faingezicht — max.cr

Max Faingezicht's personal site, built for **https://max.cr/**: a notebook of the things he is building, plus the essays that used to live on the old max.cr blog.

It is a static site. There is no backend, no framework, no newsletter service, and no build step at deploy time. A small script renders the Markdown posts into HTML, and the generated files are committed. The only third-party script is the Google Analytics 4 tag carried over from the old max.cr.

## Repository layout

| Path | What it is |
| --- | --- |
| `site/` | The deployable site, served at the origin root: `index.html`, `style.css`, `main.js`, `robots.txt`, `_headers`, `_redirects`, `favicon.svg`, `assets/`, and the generated `posts/`, `rss.xml`, and `sitemap.xml`. |
| `content/posts/` | The blog posts as Markdown with frontmatter. One file per post; the file name is the URL slug. |
| `content/notebook.json` | The dated notebook entries (one per project) as they appear in the feed. Keep it in step with the disclosures on the home page. |
| `scripts/build.mjs` | Renders posts into `site/posts/`, fills the Posts list on the home page, and writes the feed and sitemap. |
| `wrangler.jsonc` | Cloudflare Pages configuration: names the project `maxcr` and points its output directory at `site/`. |
| `.github/workflows/build-check.yml` | CI: rebuilds the posts, feed, and sitemap and fails if the committed output under `site/` is stale. |
| `docs/` | The original handoff brief: `BUILD_BRIEF.md`, `CONTENT_AND_LAUNCH.md`, `ASSETS.md`. |
| `AGENTS.md` | Instructions for coding agents. Read it before changing content. |
| `assets-manifest.json` | Dimensions and hashes of the images and fonts, including the two illustrations added in November 2026 and the regenerated share image. |
| `originals/` | PNG masters of the crayon illustrations. Not deployed. |
| `design-lab/` | The handoff's design workbook and critique archive. Kept for reference, not deployed. |
| `licenses/` | Copyright and license notice for the bundled URW P052 fonts. Keep it with the fonts. |

## Preview locally

```sh
npm install        # once; installs the Markdown renderer
npm run build      # renders posts, feed, sitemap, and the home-page post list
npm run preview    # http://localhost:8000/ (plain file server)
npm run dev        # http://localhost:8788/ with the redirect and header rules applied (wrangler pages dev)
```

## Writing a post

1. Add `content/posts/YYYY-MM-DD-your-slug.md`:

   ```md
   ---
   title: "Your title"
   pubDatetime: 2026-11-09T12:00:00Z
   description: "One or two sentences shown as the lead and in the feed."
   tags: ["future-of-work"]
   draft: false
   ---

   Body in Markdown. Links to other sites open in a new tab automatically.
   ```

2. Run `npm run build`. The post appears at `/posts/YYYY-MM-DD-your-slug/`, in the Posts section of the home page, in `/posts/`, in `rss.xml`, and in `sitemap.xml`.
3. Commit the Markdown together with the generated files under `site/`.

Images go in `site/assets/` and are referenced as `/assets/name.webp`. For a video, use the `video-embed` wrapper with a `youtube-nocookie.com` iframe, as the TEDx post does. Set `draft: true` to keep a post out of the build.

## Adding a notebook entry

The dated entries inside each project's "Open the notebook" disclosure are hand-written HTML in `site/index.html`. To add or change one: edit the disclosure and the "Latest entries" list, add or update the matching object in `content/notebook.json` so the feed carries it, run `npm run build`, and update the footer's "Last updated" date. Keep event dates distinct from edit dates.

## Deploy

The site is the Cloudflare Pages project `maxcr`, connected to this repository with production branch `main`, and it already holds the `max.cr` custom domain. Pages builds nothing: the project settings should be **Framework preset** None, **Build command** empty, and **Build output directory** `site` (`wrangler.jsonc` declares the same output directory). Every push to `main` deploys production; pushes to other branches get preview URLs on `pages.dev`, which Cloudflare serves with a `noindex` header, and `site/_headers` adds that header to the production `pages.dev` copy so only max.cr is indexed.

### Cutting over from the Astro blog (owner steps, once)

1. The first `main` build after this change fails while the project still carries the Astro build command. In the Pages project open **Settings → Builds & deployments → Build configuration**, set Framework preset to None, clear the build command, set the output directory to `site`, and save. Then open the failed deployment and choose **Retry deployment**.
2. Check `https://max.cr/`: the notebook loads; `/posts/`, each post, `/rss.xml`, and `/sitemap.xml` load; `/about`, `/tags`, `/archives`, `/search`, `/feed.xml`, and `/sitemap-index.xml` redirect.
3. `www.max.cr`, if wanted: add a proxied placeholder `A` record (`192.0.2.1`) for `www` and a redirect rule from the "Redirect from WWW to root" template under Rules → Redirect Rules.
4. Retire the old setup: the `inventionfactory` Worker still serves the previous copy of this site at inventionfactory.ai from the `maxfain/inventionfactory` repository. Remove that custom domain when the domain is repurposed, delete the Worker, and archive that repository. While old links circulate, a zone redirect rule from `inventionfactory.ai` to `https://max.cr` keeps them working.

## Launch checklist for max.cr

- `https://max.cr/` loads over HTTPS, and `http://` and `www` redirect to it.
- `https://max.cr/#entry-basedagents`, `#entry-agentriders`, `#entry-telescoped`, `#entry-popsky`, and `#entry-keyring` open the matching notebook entry.
- `https://max.cr/rss.xml` validates and lists the notebook entries and the posts; `https://max.cr/sitemap.xml` is served.
- `https://max.cr/assets/share-notebook.png` is publicly fetchable (1600 × 840) so social previews render.
- Recheck time-sensitive facts if launching later: book publication date, project availability, and external link destinations.

## Updating content

- Project statuses in this version: BasedAgents, AgentRiders, and Telescoped are Live; Popsky is in Closed beta; Keyring is Archived.
- Update the footer "Last updated" date only when content actually changes.
- Do not invent dates, metrics, anecdotes, testimonials, or roadmap promises, and never describe the generated illustrations as childhood drawings. See `AGENTS.md` and `docs/CONTENT_AND_LAUNCH.md` for the full content boundaries.

## Fonts

`NotebookSerif` is URW P052 (Roman and Italic) from the URW base35 collection, distributed under AGPL-3 with a font exception. The original notice is in `licenses/URW-base35-copyright-and-license.txt`. Body text uses the system Arial/Helvetica stack.
