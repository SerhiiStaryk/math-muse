# Math Muse — Fun Multiplication & Division (PWA)

Math Muse is a small React + TypeScript + Material UI progressive web app designed to help children learn and practise multiplication, division and number comparison. The app is PWA-ready, stores progress in the browser's Local Storage, and includes simple progress tracking and configurable settings.

## Quick start

1. Open a terminal and change into the repository:

```bash
cd math-muse
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server (Vite):

```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## What you'll find in this project

- Project entry: `index.html`, `src/main.tsx`, `src/App.tsx`
- Routing: `src/router/router.tsx`
- Pages: `src/pages/Multiply`, `src/pages/Divide`, `src/pages/Compare`, `src/pages/Dashboard`
- Reusable components: `src/components/*` (Question card, AppBar, SideBar, GameResult, etc.)
- Helpers & storage: `src/helpers/general.ts`, `src/helpers/storage.ts`
- Constants: `src/constants/*` (rules and limits for generated questions)

## Features

- Multiplication, division and comparison game modes
- Progress persistence in Local Storage (per-task attempts and correctness)
- Simple mastery tracking (tasks considered "mastered" after more than 5 correct answers)
- PWA-ready (service worker + manifest) for offline/installable experience

## Scripts

Typical npm scripts available in this project (see `package.json`):

- `npm run dev` — start the Vite development server
- `npm run build` — build production bundle
- `npm run preview` — locally preview the production build
- `npm run test` — run unit tests (Vitest)
- `npm run lint` — run linter
- `npm run deploy` — (optional) build and deploy (e.g., to GitHub Pages) if configured

Run the dev server and build commands from the project root.

## PWA & deployment notes

- The app includes PWA support configured via Vite (see `vite.config.ts`).
- To test installability locally:

```bash
npm run build
npx serve dist
```

Then open the served site and use your browser's install/app install prompts.

If you plan to host under a subpath (GitHub Pages or similar), check and update the base path in `vite.config.ts` and any homepage settings in `package.json`.

## Storage and progress

- The app persists user attempts, results and settings in Local Storage using helper functions in `src/helpers/storage.ts`.
- A task is considered "mastered" after more than 5 correct answers (see the storage helpers and UI which use this threshold).

## Contributing

- Run linting and tests before opening a PR:

```bash
npm run lint
npm run test
```

- Follow the existing TypeScript and React conventions in the codebase. Small improvements (tests, types, docs) are welcome.

## Files & quick links

- `package.json` — project scripts and dependencies
- `vite.config.ts` — Vite + PWA configuration
- `src/helpers/general.ts` — question generation and game logic helpers
- `src/helpers/storage.ts` — Local Storage helpers (record attempts, load settings, clear results)
- `src/components/QuestionCard/index.tsx` — UI for presenting a question
