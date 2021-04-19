import { StoreType } from 'core/rootReducer';
import {
  setCategories,
  setGroups,
  setItems,
  setProperties,
} from 'data/actions';
import { ActionType } from 'data/actionType';
import {
  getCategories,
  getGroups,
  getItem,
  getItems,
  getProperties,
} from 'data/api';
import { Category, Group, Item, Property } from 'data/model';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import {
  concatMap,
  filter,
  ignoreElements,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { convertItemFromFirebase } from './converter';

const parseResponse = (response: any) => {
  const items = response[0] as Item[];
  const groups = response[1] as Group[];
  const categories = response[2] as Category[];
  const properties = response[3] as Property[];

  return { items, groups, categories, properties };
};

export const getItemsEpic = (
  action$: ActionsObservable<{
    type: string;
    setLoading?: (value: boolean) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETITEMSASYNC)),
    mergeMap(({ setLoading }) =>
      forkJoin([
        getItems(),
        getGroups(),
        getCategories(),
        getProperties(),
      ]).pipe(
        tap(() => setLoading?.(false)),
        concatMap((response) => {
          const { items, groups, categories, properties } = parseResponse(
            response
          );
          return of(
            ...[
              setItems(
                items.map((item) =>
                  convertItemFromFirebase(item, groups, categories, properties)
                )
              ),
              setGroups(groups),
              setCategories(categories),
              setProperties(properties),
            ]
          );
        })
      )
    )
  );

export const getItemEpic = (
  action$: ActionsObservable<{
    type: string;
    id: string;
    onResponseCallback: (response: Item) => void;
  }>,
  $state: StateObservable<StoreType>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETITEMASYNC)),
    mergeMap(({ id, onResponseCallback }) =>
      from(getItem(id)).pipe(
        tap((response) => {
          const result = convertItemFromFirebase(
            response,
            $state.value.data.groups,
            $state.value.data.categories,
            $state.value.data.properties
          );
          onResponseCallback(result);
        }),
        ignoreElements()
      )
    )
  );
