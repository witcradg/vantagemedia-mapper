export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationRecord {
  id: string;
  label: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  coordinates: LocationCoordinates;
  sourceTag: string;
  notes: string;
}
