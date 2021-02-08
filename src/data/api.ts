import { db } from 'database';

import { convertDecisionType, convertRuleType } from './helper';
import {
  Group,
  Item,
  Location,
  Property,
  Rule,
  RuleView,
  DecisionView,
  Decision,
  Category,
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

export const getItems = () => {
  return db
    .collection('items')
    .get()
    .then((response) =>
      response.docs.map<Item>((x) => {
        const item = x.data() as Item;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const getGroups = () => {
  return db
    .collection('items-groups')
    .get()
    .then((response) =>
      response.docs.map<Group>((x) => {
        const item = x.data() as Group;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const getProperties = () => {
  return db
    .collection('items-properties')
    .get()
    .then((response) =>
      response.docs.map<Property>((x) => {
        const item = x.data() as Property;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const getCategories = () => {
  return db
    .collection('categories')
    .get()
    .then((response) =>
      response.docs.map<Category>((x) => {
        const item = x.data() as Category;
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

export const createGroup = (group: Group) => {
  return db
    .collection('items-groups')
    .add({
      ...group,
    })
    .then((x) => x.id)
    .catch((error) => console.log(error));
};

export const getGroup = (id: string) => {
  return db
    .collection('items-groups')
    .doc(id)
    .get()
    .then((response) => {
      const location = response.data() as Group;
      return location;
    })
    .catch((error) => console.log(error));
};

export const createItem = (item: Item) => {
  return db
    .collection('items')
    .add({
      ...item,
    })
    .then((x) => x.id)
    .catch((error) => console.log(error));
};

export const createRule = (rule: Rule) => {
  return db
    .collection('rules')
    .add({
      ...rule,
    })
    .then((x) => x.id)
    .catch((error) => console.log(error));
};

export const createDecision = (decision: Decision) => {
  return db
    .collection('decisions')
    .add({
      ...decision,
    })
    .then((x) => x.id)
    .catch((error) => console.log(error));
};
