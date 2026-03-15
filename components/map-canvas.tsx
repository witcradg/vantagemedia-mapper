"use client";

import { useEffect, useRef, useState } from "react";

import type { LocationRecord } from "@/types/location-record";

type MapStatus = "loading" | "ready" | "fallback" | "error";

type GoogleMapsWindow = Window &
  typeof globalThis & {
    google?: typeof google;
  };

function buildEmbedUrl(location: LocationRecord) {
  const query = encodeURIComponent(
    `${location.addressLine1}, ${location.city}, ${location.state} ${location.postalCode}`
  );

  return `https://www.google.com/maps?q=${query}&z=14&output=embed`;
}

export function MapCanvas({
  location,
  hasGoogleMapsKey,
}: {
  location: LocationRecord;
  hasGoogleMapsKey: boolean;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<MapStatus>(
    hasGoogleMapsKey ? "loading" : "fallback"
  );

  useEffect(() => {
    if (!hasGoogleMapsKey) {
      setStatus("fallback");
      return;
    }

    let cancelled = false;

    const initializeMap = () => {
      if (cancelled || !mapRef.current) {
        return;
      }

      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat: location.coordinates.latitude,
          lng: location.coordinates.longitude,
        },
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      new google.maps.Marker({
        map,
        position: {
          lat: location.coordinates.latitude,
          lng: location.coordinates.longitude,
        },
        title: location.label,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#dc2626",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeOpacity: 1,
          strokeWeight: 3,
          scale: 10,
        },
      });

      setStatus("ready");
    };

    const existingGoogle = (window as GoogleMapsWindow).google;
    if (existingGoogle?.maps) {
      initializeMap();
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    script.onerror = () => {
      if (!cancelled) {
        setStatus("error");
      }
    };

    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [hasGoogleMapsKey, location]);

  return (
    <div className="relative h-full min-h-[500px] overflow-hidden rounded-[1.3rem] bg-[#e7edf3]">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 bg-[linear-gradient(180deg,rgba(20,33,61,0.92),rgba(20,33,61,0.64),transparent)] px-5 py-5 text-white">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Live Map
          </p>
          <h2 className="mt-1 text-2xl">{location.label}</h2>
        </div>
        <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
          {status}
        </div>
      </div>

      {status === "fallback" || status === "error" ? (
        <div className="h-full min-h-[500px]">
          <iframe
            title="Google Maps fallback"
            src={buildEmbedUrl(location)}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}

      <div
        ref={mapRef}
        className={status === "fallback" || status === "error" ? "hidden" : "h-full w-full"}
      />

      <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-white/50 bg-white/88 p-4 text-sm shadow-lg backdrop-blur">
        <p className="font-semibold text-foreground">Selected address</p>
        <p className="mt-1 text-muted">
          {location.addressLine1}, {location.city}, {location.state}{" "}
          {location.postalCode}
        </p>
      </div>
    </div>
  );
}
