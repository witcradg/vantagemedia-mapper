# Washington Address Map

Small Next.js app that reads a typed Washington address record from a local file and renders it on a map.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Run

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

Without a Google Maps API key, the app falls back to a Google Maps embed.

## Data Model

The current location lives in `data/selected-address.json` and is typed by `types/location-record.ts` so it can be converted into a table-backed model later without reshaping the UI contract.

# vantagemedia-mapper
