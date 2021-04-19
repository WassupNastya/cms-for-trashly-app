import { StoreType } from 'core/rootReducer';
import {
  setCategories,
  setDecisions,
  setGroups,
  setItems,
  setProperties,
} from 'data/actions';
import { ActionType } from 'data/actionType';
import {
  getCategories,
  getDecision,
  getDecisions,
  getGroups,
  getItems,
  getProperties,
} from 'data/api';
import { Category, Decision, Group, Item, Property, Rule } from 'data/model';
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

import { convertDecisionFromFirebase } from './converter';

const parseResponse = (response: any) => {
  const decisions = response[0] as Decision[];
  const items = response[1] as Item[];
  const groups = response[2] as Group[];
  const categories = response[3] as Category[];
  const properties = response[4] as Property[];

  return { decisions, items, groups, categories, properties };
};

export const getDecisionsEpic = (
  action$: ActionsObservable<{
    type: string;
    setLoading?: (value: boolean) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETDECISIONSASYNC)),
    mergeMap(({ setLoading }) =>
      forkJoin([
        getDecisions(),
        getItems(),
        getGroups(),
        getCategories(),
        getProperties(),
      ]).pipe(
        tap(() => setLoading?.(false)),
        concatMap((response) => {
          const {
            decisions,
            items,
            groups,
            categories,
            properties,
          } = parseResponse(response);
          return of(
            ...[
              setDecisions(
                decisions.map((decision) =>
                  convertDecisionFromFirebase(
                    decision,
                    items,
                    groups,
                    categories,
                    properties
                  )
                )
              ),
              setItems(items),
              setGroups(groups),
              setCategories(categories),
              setProperties(properties),
            ]
          );
        })
      )
    )
  );

export const getDecisionEpic = (
  action$: ActionsObservable<{
    type: string;
    id: string;
    onResponseCallback: (response: Decision) => void;
  }>,
  $state: StateObservable<StoreType>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETDECISIONASYNC)),
    mergeMap(({ id, onResponseCallback }) =>
      from(getDecision(id)).pipe(
        tap((response) => {
          const result = convertDecisionFromFirebase(
            response,
            $state.value.data.items,
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
