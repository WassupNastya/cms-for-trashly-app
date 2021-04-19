import { Location } from 'data/model';

export interface LocationForDownload {
  id: number;
  displayName: string;
  latitude: string;
  longitude: string;
  state: string;
  county: string;
  country: string;
  defaultZoomLevel: string;
  locationCode: string;
}

export const prepareLocationForDownload = (location: Location, id: number) => {
  const result: LocationForDownload = {
    ...location,
    id,
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    defaultZoomLevel: location.defaultZoomLevel.toString(),
  };
  return result;
};
