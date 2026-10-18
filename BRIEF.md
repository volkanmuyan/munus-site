# munus — website brief

munus is a creative agency in Ankara and London. Tagline: **a space of possibilities.**
The site is in English, single page, black and white, airy (reference: alaaddin-tr.com).

`public/index.html` is the approved prototype. It is the source of truth for layout, copy,
colours, type and motion. Rebuild or ship it without changing the design unless asked.

## Page structure (top to bottom)

| Anchor | Section | Notes |
|---|---|---|
| `#top` | Header | Wordmark "munus" (text, no logo mark). Transparent over the hero, dark veil after scrolling. Thin reading-progress bar. |
| `#hero` | Hero | Full-viewport video slider, 6 slides (one per expertise area), 7 s each, crossfade + slow zoom. Headline "a space of possibilities." Bottom bar: area name, `01 / 06` counter, progress segments, prev/next round buttons. Swipe and arrow keys. Pauses when the bottom bar is hovered, when off-screen, and when the menu is open. |
| `#hello` | Positioning | Large statement: "munus is a creative agency built to open up possibilities for the brands and institutions we work with." Supporting line + "meet the team" link. |
| `#team` | Team | Four ID-badge cards hanging from one curved wire, each on its own string, slowly swaying. Hover: card tilts toward the pointer and gets a silver-foil sheen. Click: 3D flip to the back (title, city, one line, focus areas, email, vCard QR). Horizontal scroll on phones. |
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

## Contact data

- Email: hello@munus.com
- Ankara: ODTÜ Teknokent, İhsan Doğramacı Blv., Üniversiteler Mah., 06800 Çankaya, Ankara, Türkiye (no building/unit yet)
- London: 12 Sample Street, London EC1X 0XX — **made-up placeholder, replace before launch**

## Open items before launch

- [ ] Real hero videos → replace `public/videos/hero-1.mp4 … hero-4.mp4` and add `hero-5.mp4`, `hero-6.mp4` (slides 5–6 reuse hero-2/hero-4 for now) (1920×1080, muted, 8–15 s, 2–6 MB; also export a poster frame for each).
- [ ] Team: names, titles, photos (portrait, ~4:5), emails; QR codes are generated from these (vCard).
- [ ] Real London address — the site currently shows a made-up placeholder.
- [ ] munus originals projects.
- [ ] Confirm the Helvena licence covers web embedding.
- [ ] Domain (munus.com?) and the hello@ mailbox.
- [ ] Favicon, Open Graph image, page title/description check.
- [ ] Privacy / cookie notice (KVKK, UK GDPR) if analytics are added.
