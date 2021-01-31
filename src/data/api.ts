import { db } from 'database';

import { convertDecisionType, convertRuleType } from './helper';
import {
  ItemsGroup,
  ItemsItem,
  Location,
  ItemsProperty,
  Rule,
  RuleView,
  DecisionView,
  Decision,
} from './model';

export const getLocations = () => {
  return db
    .collection('locations')
    .get()
    .then((response) =>
      response.docs.map<Location>((x) => {
        const location = x.data() as Location;
        location.id = x.id;
        return location;
      })
    )
    .catch((error) => console.log(error));
};

export const getLocation = (id: string) => {
  return db
    .collection('locations')
    .doc(id)
    .get()
    .then((response) => {
      const location = response.data() as Location;
      return location;
    })
    .catch((error) => console.log(error));
};

export const getItemsItems = () => {
  return db
    .collection('items-items')
    .get()
    .then((response) =>
      response.docs.map<ItemsItem>((x) => {
        const item = x.data() as ItemsItem;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const getItemsGroups = () => {
  return db
    .collection('items-groups')
    .get()
    .then((response) =>
      response.docs.map<ItemsGroup>((x) => {
        const item = x.data() as ItemsGroup;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const getItemsProperties = () => {
  return db
    .collection('items-properties')
    .get()
    .then((response) =>
      response.docs.map<ItemsProperty>((x) => {
        const item = x.data() as ItemsProperty;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const getRules = () => {
  return db
    .collection('rules')
    .get()
    .then((response) =>
      response.docs.map<RuleView>((x) => {
        const item = x.data() as Rule;
        item.id = x.id;
        return convertRuleType(item);
      })
    )
    .catch((error) => console.log(error));
};

export const getDecisions = () => {
  return db
    .collection('decisions')
    .get()
    .then((response) =>
      response.docs.map<DecisionView>((x) => {
        const item = x.data() as Decision;
        item.id = x.id;
        return convertDecisionType(item);
      })
    )
    .catch((error) => console.log(error));
};
