import { db } from 'database';

import { cleanObject, handleObject } from './converters';
import {
  Group,
  Item,
  Location,
  Property,
  Decision,
  Category,
  Rule,
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
    .collection('groups')
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
    .collection('properties')
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
      response.docs.map<Rule>((x) => {
        const item = x.data() as Rule;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const getDecisions = () => {
  return db
    .collection('decisions')
    .get()
    .then((response) =>
      response.docs.map<Decision>((x) => {
        const item = x.data() as Decision;
        item.id = x.id;
        return item;
      })
    )
    .catch((error) => console.log(error));
};

export const createGroup = (group: Group) => {
  const id = db.collection('groups').doc().id;
  return db
    .collection('groups')
    .doc(id)
    .set({
      ...group,
      id,
    })
    .then(() => id)
    .catch((error) => console.log(error));
};

export const getGroup = (id: string) => {
  return db
    .collection('groups')
    .doc(id)
    .get()
    .then((response) => {
      const location = response.data() as Group;
      return location;
    })
    .catch((error) => console.log(error));
};

export const createItem = (item: Item) => {
  const id = db.collection('items').doc().id;
  return db
    .collection('items')
    .doc(id)
    .set(
      handleObject({
        ...item,
        id,
      })
    )
    .then(() => id)
    .catch((error) => console.log(error));
};

export const createRule = (rule: Rule) => {
  const id = db.collection('rules').doc().id;
  return db
    .collection('rules')
    .doc(id)
    .set(
      handleObject<Rule>({
        ...rule,
        id,
      })
    )
    .then(() => id)
    .catch((error) => console.log(error));
};

export const createDecision = (decision: Decision) => {
  const id = db.collection('decisions').doc().id;
  return db
    .collection('decisions')
    .doc(id)
    .set(
      handleObject<Decision>({
        ...decision,
        id,
      })
    )
    .then(() => id)
    .catch((error) => console.log(error));
};

export const createCategory = (category: Category) => {
  const id = db.collection('categories').doc().id;
  return db
    .collection('categories')
    .doc(id)
    .set({
      ...category,
      id,
    })
    .then(() => id)
    .catch((error) => console.log(error));
};

export const createProperty = (property: Property) => {
  const id = db.collection('properties').doc().id;
  return db
    .collection('properties')
    .doc(id)
    .set({
      ...property,
      id,
    })
    .then(() => id)
    .catch((error) => console.log(error));
};

export const createLocation = (location: Location) => {
  const id = db.collection('locations').doc().id;
  return db
    .collection('locations')
    .doc(id)
    .set(
      cleanObject<Location>({
        ...location,
        id,
      })
    )
    .then(() => id)
    .catch((error) => console.log(error));
};
