import { MapCanvas } from "@/components/map-canvas";
import { readSelectedLocation } from "@/lib/address-repository";

export default async function Home() {
  const location = await readSelectedLocation();
  const hasGoogleMapsKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(20,33,61,0.12)] backdrop-blur sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-accent-strong">
            Vantage Media Demo
          </p>
          <h1 className="max-w-3xl text-4xl leading-none sm:text-5xl">
            File-backed Washington address mapped as a red dot.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            The app reads one selected Washington location from a local JSON
            file, keeps the shape typed for future table conversion, and
            renders it on a Google Maps-first view.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface-strong p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Address Source
              </p>
              <p className="mt-3 text-lg font-semibold">{location.label}</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                {location.addressLine1}
                <br />
                {location.city}, {location.state} {location.postalCode}
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-surface-strong p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Coordinates
              </p>
              <p className="mt-3 text-lg font-semibold">
                {location.coordinates.latitude.toFixed(6)},{" "}
                {location.coordinates.longitude.toFixed(6)}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                The map centers on these stored values so no live geocoding is
                required for the initial render.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            <section className="rounded-3xl border border-border bg-surface-strong p-5">
              <h2 className="text-xl">Plan</h2>
              <ol className="mt-3 grid list-decimal gap-2 pl-5 text-sm leading-6 text-muted">
                <li>Mirror the shared stack: Next 16, React 19, TypeScript, App Router.</li>
                <li>Use a file-backed typed location model instead of Supabase.</li>
                <li>Render a Google Maps-first experience with a red-dot marker.</li>
                <li>Show implementation status, open issues, and the current summary on screen.</li>
              </ol>
            </section>

            <section className="rounded-3xl border border-border bg-surface-strong p-5">
              <h2 className="text-xl">Issues Needing Help</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
                <li>
                  {hasGoogleMapsKey
                    ? "Google Maps API key detected. Full scripted map rendering is enabled."
                    : "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local to guarantee the scripted Google map and the custom red dot in every environment."}
                </li>
                <li>
                  The current address is a single seeded Washington location.
                  If you want true runtime randomness later, we should store a
                  list and select server-side on each request.
                </li>
              </ul>
            </section>

            <section className="rounded-3xl border border-border bg-surface-strong p-5">
              <h2 className="text-xl">On-Screen Summary</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Status: implemented with local typed data, no Supabase,
                Google Maps preferred, and a fallback embed when the API key is
                missing.
              </p>
            </section>
          </div>
        </section>

        <section className="map-shell map-grid min-h-[540px] p-3 sm:p-4">
          <MapCanvas location={location} hasGoogleMapsKey={hasGoogleMapsKey} />
        </section>
      </div>
    </main>
  );
}
