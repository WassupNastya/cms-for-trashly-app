import { StoreType } from 'core/rootReducer';
import {
  setCategories,
  setGroups,
  setItems,
  setProperties,
  setRules,
} from 'data/actions';
import { ActionType } from 'data/actionType';
import {
  getCategories,
  getGroups,
  getItems,
  getProperties,
  getRule,
  getRules,
} from 'data/api';
import { Category, Group, Item, Property, Rule } from 'data/model';
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

import { convertRuleFromFirebase } from './converter';

const parseResponse = (response: any) => {
  const rules = response[0] as Rule[];
  const items = response[1] as Item[];
  const groups = response[2] as Group[];
  const categories = response[3] as Category[];
  const properties = response[4] as Property[];

  return { rules, items, groups, categories, properties };
};

export const getRulesEpic = (
  action$: ActionsObservable<{
    type: string;
    setLoading?: (value: boolean) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETRULESASYNC)),
    mergeMap(({ setLoading }) =>
      forkJoin([
        getRules(),
        getItems(),
        getGroups(),
        getCategories(),
        getProperties(),
      ]).pipe(
        tap(() => setLoading?.(false)),
        concatMap((response) => {
          const {
            rules,
            items,
            groups,
            categories,
            properties,
          } = parseResponse(response);
          return of(
            ...[
              setRules(
                rules.map((rule) =>
                  convertRuleFromFirebase(
                    rule,
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

export const getRuleEpic = (
  action$: ActionsObservable<{
    type: string;
    id: string;
    onResponseCallback: (response: Rule) => void;
  }>,
  $state: StateObservable<StoreType>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETRULEASYNC)),
    mergeMap(({ id, onResponseCallback }) =>
      from(getRule(id)).pipe(
        tap((response) => {
          const result = convertRuleFromFirebase(
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
