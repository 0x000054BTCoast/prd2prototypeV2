# Page2Prototype

Page2Prototype converts short Markdown page specs into realistic admin dashboard prototypes.

## Features

- Parse Markdown page specs into normalized `Page JSON`
- Optional DeepSeek-based parsing via `/api/parse/ai`
- Deterministic prototype engine (`layout planner -> render tree -> renderers`)
- HTML prototype renderer (Element Plus-oriented markup)
- SVG renderer (Figma-compatible flat SVG)
- Mock table data generation

## Project structure

- `server/`: Express + TypeScript backend
- `web/`: Vue 3 + Vite + Element Plus frontend
- `examples/`: sample page specs

## API

- `POST /api/parse` → parse markdown spec with deterministic parser
- `POST /api/prototype` → parse + layout + render HTML and SVG
- `POST /api/parse/ai` → DeepSeek parsing path (`DEEPSEEK_API_KEY` required)

## Run locally

```bash
npm install
npm run dev
```

Server runs on `:3000`, web runs on Vite default port.

## Example input

See `examples/user-management.md`.
