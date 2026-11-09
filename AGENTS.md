# Coding-agent instructions — Max Faingezicht’s site (max.cr)

## Since the handoff (November 2026)

- The site is now Max Faingezicht’s unified personal site at https://max.cr/, merging the Invention Factory notebook with the former max.cr blog. The “Invention Factory” name is retired: the wordmark is “Max Faingezicht.” and inventionfactory.ai is being repurposed.
- Projects now include AgentRiders and Telescoped. Their rows are text-only until their crayon illustrations arrive (see README, “Pending artwork”). Everything written about them comes from their public sites, Max’s own 2019 post, and AgentRiders’ public flight log.
- Posts are Markdown in `content/posts/`, rendered by `scripts/build.mjs` (`npm run build`). The script copies the home page’s header, footer, and analytics block into sub-pages, so run it after editing those too, and commit the generated files.
- The owner chose to keep the Google Analytics 4 tag from the old max.cr. Do not add other third-party scripts.
- The repository is `maxfain/maxcr`, deployed by the Cloudflare Pages project `maxcr`; the earlier `maxfain/inventionfactory` repository is retired. The design workbook from the handoff was kept out of this public repository.

The original handoff instructions follow. Their content-integrity rules still apply.

---


## Goal

Implement Max Faingezicht’s personal Invention Factory website from the supplied working reference. Preserve the specific design and story; this is an implementation handoff, not an invitation to redesign the brand.

Read `docs/BUILD_BRIEF.md`, `docs/ASSETS.md`, and `docs/CONTENT_AND_LAUNCH.md` before changing content. Use `site/index.html` as the authoritative current copy and `site/style.css` as the authoritative visual reference. The older 100-variation archive is process history, not a competing specification.

## Implementation

1. Inspect the target repository and its existing conventions. For a new project, the supplied static implementation is sufficient. If a framework is already in use, adapt into its components and asset paths without adding an unnecessary backend.
2. Reuse the supplied images and fonts. Keep transparent illustration backgrounds; use `object-fit: contain`. Preserve the actual Wiley book artwork. The wordmark is live text, not a missing logo asset.
3. Preserve the headline exactly: “I wanted to be an inventor. I still do.” Keep its large serif treatment, red final line, and rough underline.
4. Preserve the section order and behaviors in the build brief. Keep notebook entries in semantic `details` / `summary` controls, or implement equivalent keyboard and accessibility behavior. A direct entry URL must open the corresponding disclosure.
5. Keep body text readable: approximately 18 px on desktop and 17 px on mobile, with dark ink and generous line height. Do not regress to the earlier small gray text.
6. Keep all source links, project evidence, labels and dates. Current handoff statuses are BasedAgents: Live; Popsky: Closed beta; Keyring: Archived.
7. Keep the book update CTA pointed at the existing official mailing-list page. There is no general newsletter backend. Do not show a successful signup without actually storing a subscription through an authorized service.
8. Preserve the supplied site’s noindex setting while it is a draft. Configure the production origin and indexing only for the owner’s intended launch; see the launch notes.
9. The design lab is optional process material. Keep it for review. For a production build without it, remove its footer link and exclude its HTML, JavaScript, JSON, and review files together. Do not leave a broken link.
10. Run the relevant checks in the build brief. Deliver working source and a clear list of any genuine unresolved inputs.

## Content integrity

Do not invent childhood memories, start dates, metrics, failed experiments, quotations, testimonials, personal photographs, or roadmap promises. The illustrations are newly generated in a childlike style; never call them Max’s actual childhood drawings. Popsky’s entry is a dated public beta snapshot, not a firsthand failure report. Keyring is a historical experiment, not an active product.

Keep company financials, private relationships, internal team dynamics, unreleased strategy, and named clients out of the site unless Max expressly supplies public-use material. The proposed personal archive and a separate About page are future work; no archive was provided for this package.

## Scope

The working reference uses no database, login, analytics, payments, or API integration. Do not add them just to make the implementation seem more complete. Do not change the existing live site, DNS, audience, or hosting account merely because a reference URL is present in these instructions.
