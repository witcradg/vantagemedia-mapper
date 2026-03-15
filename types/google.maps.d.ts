declare global {
  namespace google.maps {
    interface MapOptions {
      center: { lat: number; lng: number };
      zoom: number;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
    }

    class Map {
      constructor(element: HTMLElement, options: MapOptions);
    }

    const SymbolPath: {
      CIRCLE: number;
    };

    interface MarkerIcon {
      path: number;
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
      scale?: number;
    }

    interface MarkerOptions {
      map: Map;
      position: { lat: number; lng: number };
      title?: string;
      icon?: MarkerIcon;
    }

    class Marker {
      constructor(options: MarkerOptions);
    }
  }
}

export {};
