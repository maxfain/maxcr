# Content sources and launch notes

Snapshot date: **4 November 2026**. The HTML is the current copy. The source links below explain facts and evidence; they are not instructions to import all content from those websites.

## Primary sources used in this version

| Content | Source and boundary |
| --- | --- |
| Personal story | Max’s supplied public-facing brief. Reproduce the copy in `site/index.html`; do not invent missing chronology or anecdotes. The raw private brief is not included. |
| BasedAgents field report | https://basedagents.ai/blog/from-first-task-to-merged-upstream — report dated 23 Sep 2026. Three bounties, VisiData repair, review feedback, six mounted players. Counts refer to that experiment, not overall business metrics. |
| BasedAgents product | https://basedagents.ai/ and https://basedagents.ai/about |
| Keyring setup issue | https://github.com/maxfain/basedagents/commit/0f04814efe983a71a64b6de70d325653aef90606 — 22 July 2026. Cached CLI and incompatible instructions. |
| Keyring retirement record | https://github.com/maxfain/basedagents/commit/9f815721297562bc5cb0d1caffd42c9ac8738c61 — 2 October 2026. Removal of remaining public-site references. |
| Popsky beta and example | https://popsky.ai/ — closed beta at verification. The quoted conversation is an illustrative marketing demo, not a verified customer conversation. |
| Book, authors, date, signup | https://www.d-eship.com/books/revenue-engine/ — forthcoming 20 January 2027 from Wiley at verification. |
| Actual book artwork | https://www.d-eship.com/wp-content/uploads/2026/09/de-revenue-cover.jpg |
| Book mailing list | https://www.d-eship.com/books/revenue-engine/#newsletter |
| Max’s public profiles | https://max.cr/ links to https://www.linkedin.com/in/maxcr , https://github.com/maxfain , and https://x.com/maxcr . |

## Missing inputs: do not fabricate

- Popsky’s actual development start date, a firsthand failed experiment or surprise, beta results, and next test are not supplied. The honest beta snapshot stays until Max provides them.
- Exact project inception dates are not all known. The dates shown refer to documented events or the beta snapshot, not invented start dates.
- The folder of personal archival material has not been provided. A separate About page can be developed after reviewing that material and choosing what is appropriate to publish. The current implementation has a My Story section.
- No general Invention Factory newsletter service, sender, or subscriber destination has been configured. RSS and the book’s existing mailing list are the functional return paths.
- No final custom domain or DNS destination has been selected for this handoff. Do not assume that `max.cr`, or any previously discussed name, should be replaced or redirected.

## Launch configuration

The current draft is accessible at its reference URL but deliberately contains `noindex, nofollow`. Public access and search indexing are separate settings.

When the owner chooses the final host and requests launch:

1. Set one production site origin. Replace the reference host in the canonical URL, `og:url`, `og:image`, `twitter:image`, RSS channel/self/item URLs, and any other absolute internal links. Search the entire output for `chatgpt.site` so none remain accidentally.
2. Keep asset paths valid for the chosen base path. The static reference assumes deployment at the origin root.
3. Remove the landing page’s draft `noindex` directive at launch; allow indexing in hosting headers and robots configuration. Keep review-only pages out of indexing or omit them.
4. Confirm the share image is publicly fetchable and its metadata reflects the actual asset dimensions. The bundled image is 1730 × 909 PNG. A resized delivery copy may be made if the destination platform needs a different size; preserve the artwork and readable text.
5. Verify the custom domain, HTTPS, canonical redirect, entry links, feed, fonts, and images at the actual destination.
6. Recheck time-sensitive facts if launching later: book publication status/date, project availability, and external link destinations.
7. Update the footer date only when content actually changes. Keep event dates distinct from edit dates.

A static host can serve `site/` directly. No build command is required. For a framework port, use the target repository’s normal build and deployment workflow. Keep hosting credentials and deployment account configuration outside this handoff.

## Design archive

The 100 alternatives and adversarial reviews document exploration. Some contain rejected copy or earlier factual assumptions. They are not the source of truth for implementation. The current HTML, current brief, and explicit content boundaries take precedence.
