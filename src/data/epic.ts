import { ActionsObservable, combineEpics } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { Location } from './model';
import { setLocations } from './actions';
import { ActionType } from './actionType';
import { getLocations } from './api';

const getLocationsEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETLOCATIONSASYNC)),
    mergeMap(() =>
      from(getLocations()).pipe(
        map((response: Location[]) => setLocations(response))
      )
    )
  );

export const epic = combineEpics(getLocationsEpic);
