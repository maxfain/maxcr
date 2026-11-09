// Renders content/posts/*.md into site/posts/, fills the Posts list on the home page,
// and writes site/rss.xml and site/sitemap.xml. The home page's header, footer, analytics
// snippet and share-image metadata are read from site/index.html so sub-pages never drift.
// Usage: npm run build   (the generated files are committed; the deploy has no build step)
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://max.cr';
const SITE_TITLE = 'Max Faingezicht';
const FEED_TITLE = 'Max Faingezicht — notebook and posts';
const POSTS_DIR = join(ROOT, 'content', 'posts');
const OUT = join(ROOT, 'site');

marked.use({ gfm: true });

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = md => md.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const ymd = iso => iso.slice(0, 10);
const fmtLong = iso => { const [y, m, d] = ymd(iso).split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
const fmtList = iso => { const [y, m, d] = ymd(iso).split('-'); return `${d} ${MONTHS[Number(m) - 1].slice(0, 3).toUpperCase()} ${y}`; };
const rfc822 = iso => new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toUTCString();
const tagLabel = tags => tags.map(t => t.replace(/-/g, ' ').toUpperCase()).join(' · ');

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) throw new Error('missing frontmatter');
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let [, k, v] = kv; v = v.trim();
    if (v.startsWith('[')) data[k] = v.slice(1, -1).split(',').map(x => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    else if (v === 'true' || v === 'false') data[k] = v === 'true';
    else data[k] = v.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  }
  return { data, body: raw.slice(m[0].length) };
}

// ---- shared chrome from the home page
const index = readFileSync(join(OUT, 'index.html'), 'utf8');
const pick = (re, what) => { const m = re.exec(index); if (!m) throw new Error(`index.html: cannot find ${what}`); return m[0]; };
const toSubpage = html => html.replace(/href="#top"/g, 'href="/"').replace(/href="#/g, 'href="/#');
const header = toSubpage(pick(/<header class="site-header wrap">[\s\S]*?<\/header>/, 'header'));
const footer = toSubpage(pick(/<footer class="site-footer wrap">[\s\S]*?<\/footer>/, 'footer'));
const analytics = pick(/<!-- analytics -->[\s\S]*?<!-- \/analytics -->/, 'analytics block');
const ogImage = pick(/<meta property="og:image" content="[^"]+">\s*<meta property="og:image:width"[^>]+>\s*<meta property="og:image:height"[^>]+>\s*<meta property="og:image:alt"[^>]+>/, 'og:image tags').replace(/\n\s*/g, '\n  ');

function page({ title, description, canonical, bodyClass, main, ogType = 'website' }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f9f6ee">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  ${ogImage}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE}/assets/share-notebook.png">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" type="application/rss+xml" title="${FEED_TITLE}" href="/rss.xml">
  <title>${esc(title)}</title>
  <link rel="stylesheet" href="/style.css">
  ${analytics}
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main">Skip to the content</a>
  <div class="page-margin" aria-hidden="true"></div>
  ${header}

  <main id="main">
${main}
  </main>

  ${footer}
</body>
</html>
`;
}

// ---- posts
const posts = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).map(file => {
  const slug = file.replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(readFileSync(join(POSTS_DIR, file), 'utf8'));
  if (!data.title || !data.pubDatetime) throw new Error(`${file}: title and pubDatetime are required`);
  const html = marked.parse(body).replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http');
  const description = plain(data.description || '');
  const firstParagraph = plain(body.trim().split(/\n\s*\n/)[0] || '').replace(/\s+/g, ' ');
  const showLead = description && !firstParagraph.startsWith(description.slice(0, 40));
  return { slug, title: data.title, date: data.pubDatetime, tags: data.tags || [], draft: !!data.draft, description, lead: showLead ? marked.parseInline(data.description) : '', html };
}).filter(p => !p.draft).sort((a, b) => b.date.localeCompare(a.date));

const listItem = p => `        <li><a href="/posts/${p.slug}/"><time datetime="${ymd(p.date)}">${fmtList(p.date)}</time><span><small>${esc(tagLabel(p.tags) || 'POST')}</small>${esc(p.title)}</span><b aria-hidden="true">↗</b></a></li>`;

for (const p of posts) {
  const main = `    <article class="post wrap" aria-labelledby="post-title">
      <p class="eyebrow post-eyebrow"><a href="/posts/">POSTS</a> <span>·</span> <time datetime="${ymd(p.date)}">${fmtLong(p.date).toUpperCase()}</time>${p.tags.length ? ` <span>· ${esc(tagLabel(p.tags))}</span>` : ''}</p>
      <h1 id="post-title">${esc(p.title)}</h1>
${p.lead ? `      <p class="post-lead">${p.lead}</p>\n` : ''}      <div class="post-body">
${p.html.trim()}
      </div>
      <div class="post-footer"><a class="text-link" href="/posts/">All posts <span aria-hidden="true">↗</span></a><a class="text-link" href="/#inventions">The inventions <span aria-hidden="true">↗</span></a></div>
    </article>`;
  const dir = join(OUT, 'posts', p.slug); mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page({ title: `${p.title} — ${SITE_TITLE}`, description: p.description || p.title, canonical: `${SITE}/posts/${p.slug}/`, bodyClass: 'post-page', main, ogType: 'article' }));
}

// ---- posts index
const items = posts.map(listItem).join('\n');
mkdirSync(join(OUT, 'posts'), { recursive: true });
writeFileSync(join(OUT, 'posts', 'index.html'), page({
  title: `Posts — ${SITE_TITLE}`,
  description: 'Occasional essays by Max Faingezicht on work, people, and opportunity.',
  canonical: `${SITE}/posts/`,
  bodyClass: 'posts-page',
  main: `    <section class="posts-index wrap" aria-labelledby="posts-index-title">
      <div class="section-opening">
        <p class="eyebrow section-number">POSTS</p>
        <h1 id="posts-index-title">Longer thoughts,<br>written down.</h1>
        <p>Occasional essays on work, people, and opportunity, newest first.</p>
      </div>
      <ol class="entry-list post-list">
${items}
      </ol>
      <a class="small-link" href="/rss.xml">Follow along via RSS ↗</a>
    </section>`,
}));

// ---- home page list between the markers
const marked_block = /(<!-- BUILD:POSTS -->\n)[\s\S]*?(<!-- \/BUILD:POSTS -->)/;
if (!marked_block.test(index)) throw new Error('index.html: BUILD:POSTS markers missing');
writeFileSync(join(OUT, 'index.html'), index.replace(marked_block, `$1${items}\n$2`));

// ---- feed: notebook entries + posts, newest first
const notebook = JSON.parse(readFileSync(join(ROOT, 'content', 'notebook.json'), 'utf8'));
const feedItems = [
  ...notebook.map(n => ({ title: n.title, link: `${SITE}/#${n.id}`, date: n.date, description: n.description, category: n.project })),
  ...posts.map(p => ({ title: p.title, link: `${SITE}/posts/${p.slug}/`, date: p.date, description: p.description || p.title, category: 'Posts' })),
].sort((a, b) => b.date.localeCompare(a.date));
const xml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
writeFileSync(join(OUT, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xml(FEED_TITLE)}</title>
<link>${SITE}/</link>
<description>A notebook of things I’m building: project notes, experiments, and occasional essays.</description>
<language>en</language>
<atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${feedItems.map(i => `<item><title>${xml(i.title)}</title><link>${i.link}</link><guid isPermaLink="true">${i.link}</guid><pubDate>${rfc822(i.date)}</pubDate><category>${xml(i.category)}</category><description>${xml(i.description)}</description></item>`).join('\n')}
</channel>
</rss>
`);

// ---- sitemap
const urls = [{ loc: `${SITE}/`, lastmod: ymd(feedItems[0].date) }, { loc: `${SITE}/posts/`, lastmod: ymd(posts[0]?.date || feedItems[0].date) }, ...posts.map(p => ({ loc: `${SITE}/posts/${p.slug}/`, lastmod: ymd(p.date) }))];
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`);

console.log(`built ${posts.length} posts, ${feedItems.length} feed items, sitemap with ${urls.length} urls`);
