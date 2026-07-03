# Synvix Site

Public website and support API for Synvix — an AI interview assistant.

## Structure

```
synvix-site/
├── site/         # React SPA (Vite + Tailwind + react-router)
├── site-api/     # Express API (tickets + admin auth)
└── design/       # Design source assets
```

## Development

```bash
npm run dev    # starts API (3002) + Vite dev server (5174) concurrently
npm run build  # builds both
npm run start  # starts the API server in production
```
