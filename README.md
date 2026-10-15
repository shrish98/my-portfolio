# Shrishti Tomar · Portfolio

Personal portfolio of Shrishti Tomar, a software developer in Delhi working on backend and full-stack systems.

**Live:** [my-portfolio-beta-steel-ih418ur0sz.vercel.app](https://my-portfolio-beta-steel-ih418ur0sz.vercel.app/)

## Built with

- Next.js 13 (App Router) and React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## What's on the site

- **Work:** RepoInsight, TaskForge, PrepWise and DropAlert, each with a live link, source link and key numbers.
- **About:** a short bio and quick facts.
- **Toolbox:** the tech stack, with each tool mapped to the projects it was used in.
- **Contact:** a request form that opens your email app with the message filled in.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start` and `npm run lint`.

## Updating content

- All text, projects, facts and the toolbox list live in `lib/data.ts`.
- The résumé the site links to is `public/resume.pdf`. Replace that file to update it.
- Project screenshots live in `public/`.

## Deployment

Deployed on Vercel. The site URL used for the sitemap and link previews comes from `NEXT_PUBLIC_SITE_URL` if it's set, and otherwise falls back to the Vercel production domain.

## Structure

```
app/                  layout, page, share image, sitemap, robots
components/
  sections/           hero, work, about, toolbox, contact
  header.tsx          navigation and mobile menu
  footer.tsx
  stickers.tsx        draggable hero stickers
lib/data.ts           all site content
public/               résumé, images
```
