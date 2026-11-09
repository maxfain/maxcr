# Build brief

## Design idea

A grown-up notebook for a childhood ambition. The contrast is deliberate: refined book typography, generous paper-colored space, and illustrations that look as though a five-year-old made them. Keep the roughness in the drawings and the care in the layout.

The hero uses a clothed, smiling, many-armed crayon inventor inside a crooked orange circle and blue square: a playful reference to Leonardo’s Vitruvian Man. It is a new drawing for an old ambition, as the caption states.

## Visual system

| Token | Value / use |
| --- | --- |
| Paper | `#f9f6ee` |
| Main ink | `#26231f` |
| Paragraph ink | `#393630` |
| Secondary ink | `#504c44` |
| Rules | `#d9d4c8` |
| Rust red | `#bb3c29` |
| Pencil blue | `#315597` |
| Story paper | `#f2ede0` |
| Contact background | `#ece7d9` |
| Heading font | Bundled P052 Roman / Italic, CSS family `NotebookSerif` |
| Body font | Arial, Helvetica, sans-serif |
| Main content width | 1280 px maximum, desktop padding around 64 px |
| Body type | 18 px desktop / 17 px mobile; line height about 1.8 |
| Notebook body | 16 px; line height 1.75 |
| Hero heading | Approximately 60–87 px desktop; fluid 45–70 px mobile |
| Main breakpoints | 1050, 780, and 580 px |

The current stylesheet has a base design followed by the notebook-update overrides. Preserve the effective cascade if consolidating it. Exact spacing and typography are supplied in the CSS; these numbers are a guide, not a substitute for the reference.

Use thin rules, a red page-margin line, modest labels, warm tonal panels, and an irregular underline. Keep ordinary text as HTML. Preserve the scale and texture of the art; avoid tracing it into polished icons, adding gradients, or replacing it with generic stock graphics.

## Page order and components

1. **Header:** lowercase text wordmark, author credit, navigation to inventions, latest notes, story, and contact.
2. **Hero:** exact approved headline; introductory copy; “See what I’m making” anchor; crayon inventor and honest artwork caption. Two columns on desktop, stacked on mobile.
3. **Latest entries:** compact dated list with project/category, entry title, and link. Include RSS. Links open and scroll to the matching project notebook.
4. **The inventions:** three alternating image/text rows. Each has a question, project name, short description, status, evidence panel, primary destination, and expandable notebook.
5. **My story:** contrasting lined-paper section; Costa Rica childhood curiosity, engineering, MIT, software, Telescoped, teaching, and current questions. Preserve the actual supplied copy. Three short chapter markers: Electrons / Bits / Agents.
6. **The Revenue Engine:** real cover, forthcoming date, title, short description, coauthors, official update CTA, and book-page link.
7. **Say hello:** LinkedIn, GitHub, X. Preserve verified URLs in the HTML.
8. **Footer:** wordmark, author, actual last-update date, optional review-lab link.

The generic “How I like to work” section was deliberately removed. Do not reintroduce it from earlier alternatives.

## Project records

| Project | Status in this snapshot | Visible evidence | Notebook |
| --- | --- | --- | --- |
| BasedAgents | Live | Three bounties led to one merged VisiData fix; case study link | 23 Sep 2026: narrow acceptance checks, maintainer feedback, browser verification, lesson |
| Popsky | Closed beta | Short illustrative conversation from the public product demo; clearly labeled | 4 Nov 2026: current beta snapshot and open questions; no claimed test results |
| Keyring | Archived | Actual cached-CLI error and linked development record | 2 Oct 2026 archive note, including July setup problems and retirement |

## Interaction requirements

- Native notebook disclosures work by click, touch, Enter, and Space.
- `#entry-basedagents`, `#entry-popsky`, and `#entry-keyring` open the correct disclosure on initial load and in-page navigation.
- Clicking an entry link again must work even if its hash is already selected and the disclosure was manually closed.
- The content and ordinary links remain available without JavaScript. JavaScript enhances navigation; it is not required to render the page.
- Preserve visible keyboard focus, the skip link, image alt text, semantic heading order, and reduced-motion styles.
- The book updates button navigates to the real external signup. It is not a form hosted by this site.
- The RSS feed is an actual XML file with links to entries. Future content updates should keep the latest list, disclosures, and feed consistent.

## Responsive behavior

- Desktop: alternating two-column projects, two-column hero/story/book, compact latest-entry rows.
- Small screens: one column, art before project text, naturally wrapping status labels and navigation, stacked contact links.
- Never crop the crayon art to fill a card. Preserve its transparent background and use containment.
- Keep paragraphs comfortably readable at narrow widths. Do not solve overflow by shrinking all text.

## Acceptance checks

- Compare the implementation against the bundled page, not only the live URL, which may change.
- Check 320, 390, 768, and approximately 1440 px widths. No horizontal overflow, clipped text, hidden controls, or cropped illustrations.
- Open and close every notebook with pointer and keyboard. Test direct entry URLs and repeat clicks.
- Verify all local assets, fragment links, book links, social links, and the RSS feed.
- Confirm every project has its correct status and visible evidence.
- Confirm no generated image is described as authentic childhood work and no illustrative chat is described as a customer testimonial.
- Check page-title/description, absolute canonical and sharing URLs, image dimensions, and indexing configuration for the intended environment.
- Check console errors and meaningful accessibility behavior. Use the target repository’s required checks when porting to a framework.

The packaged implementation was inspected on desktop and at 320/390/768 px; its anchors, local resources, RSS, statuses, sharing metadata, and JavaScript syntax were checked. A framework port still needs its own verification.
