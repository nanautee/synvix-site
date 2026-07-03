# Synvix Site

Public website and API for Synvix — an AI interview assistant.

## Structure

```
synvix-site/
├── site/         # React SPA (Vite + Tailwind + react-router)
├── api/          # Vercel serverless functions (tickets + admin auth)
├── design/       # Design source assets
└── vercel.json   # Vercel deployment config
```

## Development

```bash
npm run dev    # starts Vite dev server (port 5174)
```

## Deploy

Push to GitHub → import in [Vercel](https://vercel.com) → add env var `ADMIN_PASSWORD`.

The API is auto-detected from the `api/` directory. Frontend and API share the same domain.
