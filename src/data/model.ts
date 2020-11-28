export interface Action {
  type: string;
  data?: any;
}

export interface Location {
  id: string;
  displayName: string;
  latitude: number;
  longitude: number;
  state: string;
  county: string;
  country: string;
  defaultZoomLevel: number;
  locationCode: string;
}
