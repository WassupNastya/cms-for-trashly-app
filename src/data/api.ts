import { db } from 'database';

import { ItemsGroup, ItemsItem, Location, ItemsProperty, RuleForItem, RuleForGroup, RuleForCategory, DecisionForItem, DecisionForGroup, DecisionForProperties } from './model';

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
    .then((response) => response.docs.map<ItemsItem>((x) => {
      const item = x.data() as ItemsItem;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getItemsGroups = () => {
  return db
    .collection('items-groups')
    .get()
    .then((response) => response.docs.map<ItemsGroup>((x) => {
      const item = x.data() as ItemsGroup;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getItemsProperties = () => {
  return db
    .collection('items-properties')
    .get()
    .then((response) => response.docs.map<ItemsProperty>((x) => {
      const item = x.data() as ItemsProperty;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getRulesForItems = () => {
  return db
    .collection('rules-items')
    .get()
    .then((response) => response.docs.map<RuleForItem>((x) => {
      const item = x.data() as RuleForItem;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getRulesForGroups = () => {
  return db
    .collection('rules-groups')
    .get()
    .then((response) => response.docs.map<RuleForGroup>((x) => {
      const item = x.data() as RuleForGroup;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getRulesForCategories = () => {
  return db
    .collection('rules-categories')
    .get()
    .then((response) => response.docs.map<RuleForCategory>((x) => {
      const item = x.data() as RuleForCategory;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getDecisionsForItems = () => {
  return db
    .collection('decisions-items')
    .get()
    .then((response) => response.docs.map<DecisionForItem>((x) => {
      const item = x.data() as DecisionForItem;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getDecisionsForGroups = () => {
  return db
    .collection('decisions-groups')
    .get()
    .then((response) => response.docs.map<DecisionForGroup>((x) => {
      const item = x.data() as DecisionForGroup;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};

export const getDecisionsForProperties = () => {
  return db
    .collection('decisions-properties')
    .get()
    .then((response) => response.docs.map<DecisionForProperties>((x) => {
      const item = x.data() as DecisionForProperties;
      item.id = x.id;
      return item;
    }))
    .catch((error) => console.log(error));
};