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
