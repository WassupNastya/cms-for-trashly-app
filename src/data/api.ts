import { storage } from 'database';

import { Collection } from './enums';
import {
  Group,
  Item,
  Location,
  Property,
  Decision,
  Category,
  Rule,
} from './model';
import { create, deleteRequest, get, getAll } from './templatesApi';

export const getItems = getAll<Item>(Collection.Items);
export const getGroups = getAll<Group>(Collection.Groups);
export const getProperties = getAll<Property>(Collection.Properties);
export const getCategories = getAll<Category>(Collection.Categories);
export const getRules = getAll<Rule>(Collection.Rules);
export const getDecisions = getAll<Decision>(Collection.Decisions);
export const getLocations = getAll<Location>(Collection.Locations);

export const createItem = create(Collection.Items);
export const createCategory = create(Collection.Categories);
export const createProperty = create(Collection.Properties);
export const createGroup = create(Collection.Groups);
export const createRule = create(Collection.Rules);
export const createDecision = create(Collection.Decisions);
export const createLocation = create(Collection.Locations);

export const getItem = get<Item>(Collection.Items);
export const getGroup = get<Group>(Collection.Groups);
export const getCategory = get<Category>(Collection.Categories);
export const getProperty = get<Property>(Collection.Properties);
export const getRule = get<Rule>(Collection.Rules);
export const getDecision = get<Decision>(Collection.Decisions);
export const getLocation = get<Location>(Collection.Locations);

export const deleteItem = deleteRequest(Collection.Items);
export const deleteGroup = deleteRequest(Collection.Groups);
export const deleteCategory = deleteRequest(Collection.Categories);
export const deleteProperty = deleteRequest(Collection.Properties);
export const deleteRule = deleteRequest(Collection.Rules);
export const deleteDecision = deleteRequest(Collection.Decisions);
export const deleteLocation = deleteRequest(Collection.Locations);

export const uploadFile = (filename: string, blob: Blob) =>
  storage
    .ref()
    .child(filename)
    .put(blob)
    .then(() => console.log(`${filename} is uploaded`))
    .catch((e) => console.log('Error: ', e));
