import { ActionType } from './actionType';
import { Action, Location } from './model';

export const getLocationsAsync: () => Action = () => {
  return { type: ActionType.GETLOCATIONSASYNC };
};

export const setLocations: (data: Location[]) => Action = (data) => {
  return { type: ActionType.SETLOCATIONS, data };
};

export const getLocationAsync: (
  id: string,
  onResponseCallback: (response: Location) => void
) => Action = (id, onResponseCallback) => {
  return { type: ActionType.GETLOCATIONASYNC, id, onResponseCallback };
};
