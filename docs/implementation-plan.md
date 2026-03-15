# Implementation Plan

## Goal

Build a small web app that reads a Washington address from a file and displays it as a red dot on a map, using the stack patterns found in `gym-app-vibe` and `ufit-next`.

## Stack Choices

- `Next.js 16` App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- Local file-backed JSON data for now

## Plan

1. Create a minimal Next.js application in this workspace that matches the shared reference stack.
2. Store the selected address in a local JSON file instead of Supabase.
3. Externalize domain types under `types/` so the same shapes can become database tables later.
4. Render the location in a Google Maps-first client component using the stored coordinates.
5. Provide a fallback embedded map plus an on-screen summary and issues panel.

## Current Issues / Help Needed

- To guarantee the fully scripted Google Map with a custom red dot, add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to `.env.local`.
- The initial address is one seeded Washington location. If you want runtime randomization, add a file-backed collection and select one on the server per request.
