# Asset guide

Use the files in `site/assets/` directly. The four PNG masters in `originals/` are included for future editing. The book cover and share image are already supplied in their original delivered formats under `site/assets/`; no duplicate master is necessary.

| File | Dimensions | Transparent pixels | Use |
| --- | --- | --- | --- |
| `site/assets/companion.webp` | 1536 × 1024 | Yes | Popsky illustration; crayon companion; transparent raster. |
| `site/assets/hero-inventor.webp` | 1254 × 1254 | Yes | Hero illustration; newly generated childlike Vitruvian inventor; transparent raster. |
| `site/assets/keys.webp` | 1254 × 1254 | Yes | Keyring illustration; mismatched crayon keys; transparent raster. |
| `site/assets/notebook-italic.otf` | Font | No | Unmodified URW P052 Italic font file, renamed for local use. |
| `site/assets/notebook-roman.otf` | Font | No | Unmodified URW P052 Roman font file, renamed for local use. |
| `site/assets/passport.webp` | 1254 × 1254 | Yes | BasedAgents illustration; crayon robot passport; transparent raster. |
| `site/assets/revenue-engine.jpg` | 1434 × 1097 | No | Authentic Wiley book-cover mockup from the official book page; downloaded without alteration. |
| `site/assets/share-notebook.png` | 1730 × 909 | No | Open Graph / social preview; finished composition with approved headline and author credit. |
| `originals/companion-original.png` | 1536 × 1024 | Yes | Original PNG master of the corresponding generated illustration. |
| `originals/hero-inventor-original.png` | 1254 × 1254 | Yes | Original PNG master of the corresponding generated illustration. |
| `originals/keys-original.png` | 1254 × 1254 | Yes | Original PNG master of the corresponding generated illustration. |
| `originals/passport-original.png` | 1254 × 1254 | Yes | Original PNG master of the corresponding generated illustration. |

## Artwork notes

The four crayon drawings and the social image were generated for this project. They are not historical artifacts, scanned childhood drawings, licensed stock photos, or vector files. Preserve the loose marks, awkward proportions, and whitespace. Do not flatten transparent illustrations onto white; the site uses warm ivory behind them.

The share card is a raster image containing its own text. The main hero heading and wordmark on the website remain live HTML text.

The book image is the authentic publisher/author-page artwork. Source: https://www.d-eship.com/wp-content/uploads/2026/09/de-revenue-cover.jpg . It is included to present Max’s book; no broader license for unrelated reuse is represented.

## Fonts

`notebook-roman.otf` and `notebook-italic.otf` are byte-identical copies of URW base35 `P052-Roman.otf` and `P052-Italic.otf`, with local filenames. The original package copyright/license notice is included in `licenses/URW-base35-copyright-and-license.txt`; it identifies AGPL-3 with a font exception. Preserve that notice with the distributed files. Upstream source: https://github.com/ArtifexSoftware/urw-base35-fonts . No new blanket license is assigned to this mixed-asset handoff.

The body uses system fonts, so there is no separate Arial/Helvetica file to copy.

## Implementation

- Use the manifest for actual file dimensions, hashes, alpha presence, and byte sizes.
- Keep images local rather than hotlinking the source site.
- Preserve alpha if creating smaller WebP/AVIF delivery variants.
- Use lazy loading for below-the-fold artwork and the book; prioritize the hero.
- Keep descriptive alt text from the HTML. Decorative marks should be hidden from assistive technology.
- The share image metadata must match whichever delivery asset is selected.
