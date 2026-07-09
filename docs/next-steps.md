# Next Steps

## Current State

- The app is a `Next.js 16` web app using `React 19`, `TypeScript`, and `Tailwind CSS`.
- It currently reads one seeded Washington address from a local JSON file.
- The address is displayed on a map as a red marker.
- Supabase is intentionally not used at this stage.
- Custom data types are externalized so they can be mapped to tables later.

## Likely Next Requirement

The likely next phase is moving from one address to multiple addresses sourced from a spreadsheet or similar data source.

That source is expected to contain:

- address data
- additional business data
- fields that determine marker color

## Expected Implementation Direction

If this moves forward, the app will likely need to:

1. Replace the single local address record with a multi-record data source.
2. Normalize spreadsheet rows into typed marker/location records.
3. Render multiple markers on the map.
4. Use small filled circle markers instead of default pin markers.
5. Drive marker color from spreadsheet data.

## Key Dependency

The main decision gate is whether the client has a usable Google Maps API key.

- If yes, the current Google Maps-first approach should scale to multiple small colored circle markers.
- If no, the mapping approach should be reconsidered before building spreadsheet integration.

## Notes

- The client reportedly has an existing version that is not working well.
- That version uses a spreadsheet containing addresses plus other changing data.
- The current app should be treated as a clean base for the next phase rather than the final architecture.
