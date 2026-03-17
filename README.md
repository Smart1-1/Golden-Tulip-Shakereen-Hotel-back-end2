# Shakereen Inferno Backend

Standalone Express API service.

## Run

1. Install dependencies:
   - `npm install`
2. Create env file:
   - copy `.env.example` to `.env`
3. Start API:
   - `npm run start:env` (uses `.env`)
   - or `npm run start` (if env vars are provided by host panel)
4. If you updated content locally through the admin panel and want to publish the same texts/images:
   - `npm run snapshot:content`

## Development

- `npm run dev` (no required `.env`)
- `npm run dev:env` (forces loading `.env`)

## Health Check

- `GET /api/health`

## Storage

- `DATA_STORAGE_DRIVER=file` saves to `data/*.json`.
- `DATA_STORAGE_DRIVER=postgres` uses PostgreSQL (`DATABASE_URL` required).
- `UPLOADS_STORAGE_DRIVER=local` stores files under `data/uploads`.
- `UPLOADS_STORAGE_DRIVER=s3` stores files on S3-compatible storage.

## Publishable Content Snapshot

- `bootstrap/site-data.json` contains the tracked publishable site content.
- `bootstrap/uploads/*` contains the tracked publishable images.
- On a fresh server, the backend copies these files into the runtime `data/` and `uploads/` directories automatically.
- Runtime `data/*.json` and `data/uploads/*` stay local and are intentionally gitignored.
