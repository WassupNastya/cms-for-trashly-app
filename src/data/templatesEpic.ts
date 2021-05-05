import { ActionsObservable } from 'redux-observable';
import { from } from 'rxjs';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

export const get = <T>(
  actionType: string,
  request: (id: string) => Promise<void | T>,
  convert?: (value?: any) => T
) => {
  return (
    action$: ActionsObservable<{
      type: string;
      id: string;
      onResponseCallback: (response: T) => void;
    }>
  ) =>
    action$.pipe(
      filter(isOfType(actionType)),
      mergeMap(({ id, onResponseCallback }) =>
        from(request(id)).pipe(
          tap((response) =>
            onResponseCallback(convert?.(response) ?? response)
          ),
          ignoreElements()
        )
      )
    );
};

export const create = <T>(
  actionType: string,
  request: (data: T) => Promise<void | string>
) => {
  return (
    action$: ActionsObservable<{
      type: string;
      data: T;
      onResponseCallback: (response: string) => void;
    }>
  ) =>
    action$.pipe(
      filter(isOfType(actionType)),
      mergeMap(({ data, onResponseCallback }) =>
        from(request(data)).pipe(
          tap((response) => onResponseCallback(response)),
          ignoreElements()
        )
      )
    );
};

export const getAll = <T>(
  actionType: string,
  request: () => Promise<void | T[]>,
  setAll: (data: T[]) => void,
  convert?: (value: any) => T
) => {
  return (
    action$: ActionsObservable<{
      type: string;
      setLoading?: (value: boolean) => void;
    }>
  ) =>
    action$.pipe(
      filter(isOfType(actionType)),
      mergeMap(({ setLoading }) =>
        from(request()).pipe(
          map((response: T[]) =>
            setAll(convert ? response.map((x) => convert(x)) : response)
          ),
          tap(() => setLoading?.(false))
        )
      )
    );
};

export const deleteEpic = (
  actionType: string,
  request: (data: string) => Promise<void | string>
) => {
  return (
    action$: ActionsObservable<{
      type: string;
      id: string;
    }>
  ) =>
    action$.pipe(
      filter(isOfType(actionType)),
      mergeMap(({ id }) => from(request(id)).pipe(ignoreElements()))
    );
};
