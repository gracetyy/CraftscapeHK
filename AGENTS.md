# Repository Guidelines

## Project Structure & Module Organization
- Frontend React and TypeScript code lives at the repository root: UI components in `components/`, routed screens in `pages/`, reusable views in `views/`, and shared state in `contexts/`. Types centralize in `types.ts` and domain data in `constants.ts`.
- Assets for localization reside in `locales/`, while seed scripts and database helpers are kept in `seed-data.cjs`, `database.cjs`, and the mirrored `.js` builds.
- The NestJS backend is isolated under `server/` (see its own `README.md`); quick Express utilities for demos live in `server-advanced.cjs` and `start-backend.cjs` at the root.

## Build, Test, and Development Commands
- Frontend: `npm install` then `npm run dev` launches Vite on port 3000; `npm run build` outputs production assets in `dist/`; `npm run preview` serves that build locally.
- Backend: from `server/`, run `npm install` followed by `npm run start:dev` for live reload, `npm run build` for production output, and `npm run start:prod` to boot the compiled server. Use `npm run seed` to populate local data and `npm run lint`/`npm run format` before submitting changes.
- For lightweight API testing, `node server-advanced.cjs` exposes the Express prototype defined at the repository root.

## Coding Style & Naming Conventions
- Use TypeScript throughout; favor explicit interfaces exported from `types.ts` and `enums.ts`. React components and files follow `PascalCase`, while hooks, helper functions, and variables remain in `camelCase`.
- Indent with two spaces and prefer multiline readability over inline nesting. Co-locate component-specific styles or assets beside the component.
- Keep copy strings in `locales/` and route shared constants through `constants.ts` to avoid drift.

## Testing Guidelines
- Backend tests use Jest; place unit specs alongside source files as `*.spec.ts` and run `npm run test` or `npm run test:cov` inside `server/` to keep coverage healthy and catch regressions early.
- The frontend currently relies on type safety and manual QA. When adding UI logic, include lightweight integration coverage (e.g., Playwright or Vitest) and ensure `npm run build` passes before opening a PR.

## Commit & Pull Request Guidelines
- Follow conventional commits observed in history (`refactor:`, `feat:`, `UX:`) and write imperative, present-tense summaries under 72 characters.
- Each PR should describe scope, testing performed (`npm run build`, `npm run test`, etc.), and link related issues. Attach UI screenshots or recordings whenever you alter user-facing flows and call out localization updates so reviewers can verify both languages.
