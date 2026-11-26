# munus — website brief

munus is a creative agency in Ankara and London. Tagline: **a space of possibilities.**
The site is in English, single page, black and white, airy (reference: alaaddin-tr.com).

`public/index.html` is the approved prototype. It is the source of truth for layout, copy,
colours, type and motion. Rebuild or ship it without changing the design unless asked.

## Page structure (top to bottom)

| Anchor | Section | Notes |
|---|---|---|
| `#top` | Header | Wordmark "munus" (text, no logo mark). Transparent over the hero, dark veil after scrolling. Thin reading-progress bar. |
| `#hero` | Hero | Full-viewport slider of generative B&W canvas scenes, 6 slides (one per expertise area), 7 s each, crossfade + slow zoom. Headline "a space of possibilities." Bottom bar: area name, `01 / 06` counter, progress segments, prev/next round buttons. Swipe and arrow keys. Pauses when the bottom bar is hovered, when off-screen, and when the menu is open. |
| `#hello` | Positioning | Large statement: "munus is a creative agency built to open up possibilities for the brands and institutions we work with." Supporting line + "meet the team" link. |
| `#team` | Team & culture | Label "team & culture". Four ID-badge cards hanging from one curved wire, each on its own string, slowly swaying. Hover: card tilts toward the pointer and gets a silver-foil sheen. Click: 3D flip to the back (title, city, one line, previously, focus areas, email, vCard QR). Horizontal scroll on phones. Below: **life at munus**, a full-bleed B&W photo strip that pans endlessly (dot-screen overlay, faded edges, pauses on hover/motion off); then **culture**, "what's on the table." with the perks as pills (first one highlighted; 2-column grid on phones; expertise colours on hover in colour mode) and a "pull up a chair" mailto link. Last: **platforms**, "the tools on the table.": two rows of logos side by side, no boxes (logos grey and half-transparent, original colours on hover, staggered reveal) — **data & technology** (the same 16 as the reference: OpenAI, Nielsen, McKinsey & Company, Google Trends, Claude, Sprout Social, Accenture, Scenario, Business Insider, Gemini, Cursor, SurveyMonkey, ElevenLabs, GWI, Hootsuite, HypeAuditor) and **marketing & advertising** (Meta, Instagram, Google Ads, YouTube, TikTok, LinkedIn, X, Spotify, Yandex, HubSpot). Wordmarks in `public/logos/brands/`, from Wikimedia Commons or the brand's own website (Sprout Social, Cursor, GWI, Hootsuite, HypeAuditor, Scenario); Google Trends and Google Ads are a symbol + name, X is its symbol. Line under the heading: "Listed for context, not as an official partnership or endorsement." |
| `#expertise` | What we do | Six areas in an accordion; left card shows the big number (01–06) and name, tone changes per area. "sectors" row underneath. |
| `#originals` | munus *originals* | "originals" is set thin italic (Hanken Grotesk 200 italic). Placeholder for munus's own projects. |
| `#contact` | Contact | "say hello." + email and two addresses (Ankara, London). |
| footer | Footer | Wordmark, one-line description, explore + expertise columns, © and "pause motion" toggle. |

**Menu:** fixed round button bottom-right (ring text "menu", rotates; uses `mix-blend-mode: difference` so it reads on dark and light sections). Opens a full-screen light panel with a circular clip-path wipe from the button. Giant stacked links (hello, team, expertise, munus *originals*, contact) slide up in sequence; hovered link underlines, others dim. Esc closes.

## Expertise (six areas)

1. brand & marketing — campaigns, launches, social media, influencer
2. corporate & public affairs — reputation, media relations, stakeholder relations, associations
3. creative & content — visual identity, design, video, web
4. events & experiences — congresses, summits, launches, staging
5. intelligence & research — media monitoring, discourse analysis, sector reports, AI search visibility
6. advisory — crisis & issues, leadership positioning, communications counsel

Sectors: energy & utilities · construction & building materials · public sector & associations · industry & manufacturing · consumer brands

## Design tokens

- Colours: `--dark #0A0A0A`, `--dark-2 #1B1B1B`, `--dark-3 #2B2B2B`, `--light #F3F3F1`, `--paper #FFFFFF`, `--grey-light #E4E4E1`, `--grey #C9C9C5`, `--grey-mid #8C8C8C`, `--muted #5C5C5C`, `--line #D2D2CE`. No accent colour.
- Type: **Helvena** (400 / 500 / 700) for everything, Bold for headings, tight negative tracking. Fonts are embedded as base64 in the prototype; in a real build, extract them to `.woff2` files.
- "originals" only: Hanken Grotesk ExtraLight Italic (Google Fonts).
- Easing: `cubic-bezier(.2,.65,.25,1)`; menu wipe `cubic-bezier(.77,0,.18,1)`.
- Gutter `clamp(16px,4vw,56px)`, max content width 1360px.
- Respect `prefers-reduced-motion` and keep the "pause motion" toggle.

## Colour mode

- Opt-in toggle ("colour") in the top bar; black and white stays the default. The choice is remembered per browser (localStorage `munus-color`).
- Colour mode is a light theme: warm off-white `#F4F3EF` dominates, colour is used as an accent. The dark areas (hero, hello, contact, top bar) flip their tokens; the footer stays black.
- One accent per expertise, all at the same OKLCH lightness and chroma (~0.60 / 0.15) so they sit together: brand & marketing `#4C7DD9`, creative & content `#CA564B`, events & experiences `#C06400`, corporate & public affairs `#009956`, intelligence & research `#9565C7`, advisory `#0096B1`. Light tints (`--t-*`) for surfaces.
- Used for: hero art (each slide in its colour, on the light background), the expertise card, team cards (tinted faces, coloured accents), originals (research tint), "say hello." (brand), menu link hovers, the reading bar.
- Wordmark: a coloured "snake" runs along the letter strokes of "munus" (top bar and footer), one expertise colour per pass, drawn on a canvas over the text. Static when motion is paused.

## Contact data

- Email: hello@wearemunus.co (big, in the contact section). Mailbox not set up yet: planned on Google Workspace.
- Office addresses live in the footer ("offices" column), not in the contact section.
- Ankara: ODTÜ Teknokent, 06800 Çankaya, Ankara, Türkiye (no building/unit yet)
- London: 12 Sample Street, London EC1X 0XX — **made-up placeholder, replace before launch**

## About page (`/about`)

`public/about.html`. Shares `site.css` and `site.js` with the home page (both were moved out of index.html; the script skips the hero/accordion parts when they are absent). Linked from the menu ("about"), the footer and "meet the whole team" in the home team section.

1. **Intro** (dark): "one table. many hands." + short agency paragraph + facts (4 partners, 5 in the studio, 6 areas, 2 cities).
2. **Team** — "everyone at the table.": one flat grid (4 columns; 3 on tablet, 2 on phones; 16 people fill 4 full rows on desktop and the "you?" card runs below as a full-width banner — re-check when the head count changes), partners first (no separate founders tier), then the studio. Cards show only the name and, below it in light grey, the title — partners as "Partner / Title" in plain text, no pill. No description lines except Kedito's, then an "open seat — you?" card.
   - Volkan — Managing Partner · Head of Strategy (advisory colour)
   - Semih — Partner · Executive Creative Director (creative)
   - Ceren (she) — Partner · Head of Growth & Client Relations: sales, marketing, client relations (brand)
   - Çağlar — Partner · Editor-in-Chief (corporate)
   - Ulaş — Business Development Lead · Industrial & Engineering: mechanical engineer, sales/marketing for engineering firms, works with Ceren (brand)
   - Açelya — Creative Writer & Social Media Lead (brand)
   - Ozan Serkan Muyan — Architect / Creative Technologist · 3D & AI: architect, graphics + 3D, focus on AI (creative)
   - Name Surname — Account Manager · Events & Corporate Comms: client-facing, also runs events (corporate)
   - Name Surname — Media Relations Specialist (corporate)
   - Zeynep — Research & Social Impact Consultant: sector reports, surveys, ESG/social impact (research)
   - Name Surname — Head of Data & Insights: very senior data analyst; media analysis, measurement, dashboards, munus lens (research)
   - Kedito (tuxedo cat, "Office Cat" tag) — Chief Morale Officer; also Executive Box Director and Head of Purr-formance. Photo `team/kedito.webp` is a stand-in: "Tuxedo cat, front view" by Ryan Schwark, Wikimedia Commons, CC0. Swap for the real cat.
   - Mani — Senior Graphic Designer / Art Director; Koray and Ozan Serkan Muyan — Architect / Creative Technologist · 3D & AI (creative)
   - Mehmet Serdar — Junior Graphic Designer; Nehir — Architect / 3D Artist (creative)
   Photos are B&W (4:5); for now every card without a photo reuses one of the four 3D placeholder avatars (team/01–04, spread so no row or column repeats); each carries a hand-drawn SVG doodle in the person's expertise colour that draws itself in on scroll (target + arrow, crown, speech bubble, quote marks + edit caret, hashtag + heart, frame, squiggle, play, floor plan, wireframe cube). Once real photos are in, re-place each doodle on the photo (trace a collar, glasses, a gesture).
3. **How we work** — "the way we sit.": four principles (draft).
4. **Culture** — "life at munus." photo strip + the perks list (same blocks as on the home page; keep both in step).
5. **Contact** — "pull up a chair." new business / join the team.

## Open items before launch

- [ ] Hero: the six slides are generative canvas scenes ("hero art" in index.html), one per expertise — approve or swap any for real footage. The old placeholder videos in `public/videos/` are no longer used.
- [ ] Team: names, titles, photos (portrait, ~4:5), emails, previous agencies ("previously" line on the card back); QR codes are generated from these (vCard).
- [ ] Life at munus strip: 4+ real team photos (events, studio, award nights) into `public/culture/`, landscape ~1600px; they are shown greyscale. Replace the `.lf` placeholders and remove the "placeholder" tag.
- [ ] Platform lists: confirm the tools and ad platforms munus really uses. Call them "partners" only for actual partner programmes; until then keep the "listed for context" line.
- [ ] Culture perks: the list is a draft (adapted from a reference agency) — confirm which ones munus actually offers before launch.
- [ ] About page: partner titles are set (see above); still to confirm: surnames, lines, focus, "previously", cities; studio names and photos; the four "how we work" principles.
- [ ] Real London address — the site currently shows a made-up placeholder.
- [ ] munus originals projects.
- [ ] Confirm the Helvena licence covers web embedding.
- [x] Domain: **wearemunus.co** (bought on Vercel 2026-11-16, renews yearly at $24.80; Vercel DNS). `wearemunus.co` + `www` → this site, `lens.` → munus lens, `office.` → munus office. munus.agency may be added later as a redirect.
- [ ] hello@ and personal mailboxes on Google Workspace (MX/SPF/DKIM records go into Vercel DNS).
- [ ] At launch: remove the `noindex` meta in index.html and the `X-Robots-Tag` header in vercel.json; then add sitemap.xml, robots.txt, Organization JSON-LD, absolute og:image URL, and submit to Search Console.
- [ ] Vercel Web Analytics: the script is in the page; enable it in the Vercel project (Analytics tab). It is cookieless.
- [ ] Favicon, Open Graph image, page title/description check.
- [ ] Privacy / cookie notice (KVKK, UK GDPR) if analytics are added.

## Unlisted showreel (`/reel`)

- `public/reel.html` (the reel) and `public/reel/project.html` (one page per project, served at `/reel/<slug>` by a rewrite in vercel.json; locally use `/reel/project?p=<slug>`). Shared styles in `public/reel/reel.css`.
- Not linked from the site; shared by URL only. `noindex` meta on both pages plus an `X-Robots-Tag` header for `/reel*` in vercel.json — keep these after launch.
- All content lives in `public/reel/data.js` (`NUMBERS`, `WORK`, `PLACES`, `PEOPLE`). Project media go in `public/work/`; empty media shows a placeholder.
- Logo marquee: white-on-transparent files in `public/logos/`, taken from each organisation's own website (Oracle and TikTok wordmarks from Wikimedia Commons). Koç cropped to the main mark (no "100"), Uludağ Enerji without its slogan; TÜREB's site only has the emblem, so the name is set next to it.
- The credit lines say the work was done in previous roles; keep them. Showing client logos is common practice for portfolio work, but get permission where you can.
- [ ] Fill in projects, numbers and people's previous roles.
- [ ] "Official partner" badges only once munus is actually in those programmes.
