import { ActionsObservable, combineEpics } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import { Location } from './model';
import { setLocations } from './actions';
import { ActionType } from './actionType';
import { getLocations, getLocation } from './api';

const getLocationsEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETLOCATIONSASYNC)),
    mergeMap(() =>
      from(getLocations()).pipe(
        map((response: Location[]) => setLocations(response))
      )
    )
  );

const getLocationEpic = (
  action$: ActionsObservable<{
    type: string;
    id: string;
    onResponseCallback: (response: Location) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETLOCATIONASYNC)),
    mergeMap(({ id, onResponseCallback }) =>
      from(getLocation(id)).pipe(
        tap((response) => onResponseCallback(response)),
        ignoreElements()
      )
    )
  );

export const epic = combineEpics(getLocationsEpic, getLocationEpic);
