# Restart Brief

## Project

`vantagemedia-mapper`

## Goal

Build a web app that maps address data, initially from local file-based records and later likely from a spreadsheet-backed source.

## Current State

- The repo contains a working `Next.js 16` app using:
  - `React 19`
  - `TypeScript`
  - `Tailwind CSS`
- The current implementation reads one seeded Washington address from a local JSON file.
- That address is displayed on a map as a red marker.
- The app was intentionally built without Supabase for now.
- Custom types were externalized so the data model can later be mapped to database tables.

## Important Files

- [`README.md`](/home/dean/projects/active/clients/vantagemedia/README.md)
- [`docs/implementation-plan.md`](/home/dean/projects/active/clients/vantagemedia/docs/implementation-plan.md)
- [`docs/next-steps.md`](/home/dean/projects/active/clients/vantagemedia/docs/next-steps.md)
- [`app/page.tsx`](/home/dean/projects/active/clients/vantagemedia/app/page.tsx)
- [`components/map-canvas.tsx`](/home/dean/projects/active/clients/vantagemedia/components/map-canvas.tsx)
- [`lib/address-repository.ts`](/home/dean/projects/active/clients/vantagemedia/lib/address-repository.ts)
- [`types/location-record.ts`](/home/dean/projects/active/clients/vantagemedia/types/location-record.ts)
- [`data/selected-address.json`](/home/dean/projects/active/clients/vantagemedia/data/selected-address.json)

## Deployment Notes

- The GitHub repo and Vercel project are connected.
- A Vercel build issue occurred because the project was being treated like a static site expecting a `public` output directory.
- That was fixed by adding [`vercel.json`](/home/dean/projects/active/clients/vantagemedia/vercel.json) with:

```json
{
  "framework": "nextjs"
}
```

## Likely Next Phase

The likely next requirement is replacing the single local address record with multiple records coming from a spreadsheet or similar source.

That future data source is expected to include:

- addresses
- additional business data
- fields that determine marker color

## Expected Direction

If development resumes, likely next work includes:

1. Replace the single-record file source with a multi-record source.
2. Normalize spreadsheet rows into typed marker/location records.
3. Render multiple markers instead of one.
4. Use small filled circle markers.
5. Drive marker color from row data.

## Key Open Question

Confirm whether the client has a valid Google Maps API key.

- If yes, continue with the current Google Maps-first direction.
- If no, reconsider the mapping library before building the spreadsheet integration.

## Guidance For Future Restart

When resuming work in this repo, start by reading:

1. [`docs/restart-brief.md`](/home/dean/projects/active/clients/vantagemedia/docs/restart-brief.md)
2. [`docs/next-steps.md`](/home/dean/projects/active/clients/vantagemedia/docs/next-steps.md)
3. [`docs/implementation-plan.md`](/home/dean/projects/active/clients/vantagemedia/docs/implementation-plan.md)

Then verify:

- whether the client has a Google Maps API key
- what spreadsheet columns exist
- what field should control marker color
- whether the spreadsheet is read directly or synced into an app-owned data layer
