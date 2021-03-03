import lodash from 'lodash';

import { isEmpty } from './helper';
import { Category, Decision, Group, Item, Property, Rule } from './model';

export const cleanObject = <T>(obj: T) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => !isEmpty(v as string | undefined))
  );
};

export const convertPropertiesToArray = (initialObject, result) => {
  return Object.keys(initialObject).flatMap((x: string) =>
    result[x] == null ? [lodash.startCase(x)] : []
  );
};

export const convertPropertiesToField = (properties: string[]) => {
  return properties.reduce((obj, field) => {
    obj[lodash.camelCase(field)] = true;
    return obj;
  }, {});
};

export const handleObject = <T>(obj: T) => {
  const result = cleanObject<T>(obj);
  const propertiesFields = convertPropertiesToField(result.properties);
  delete result.properties;
  return { ...result, ...propertiesFields };
};

export const convertItemFromFirebase = (item) => {
  const result: Item = {
    id: item.id,
    name: item.name,
    group: item.group,
    category: item.category,
    aliases: item.aliases,
    properties: [],
  };
  return { ...result, properties: convertPropertiesToArray(item, result) };
};

export const convertRuleFromFirebase = (rule) => {
  const result: Rule = {
    id: rule.id,
    item: rule.item,
    group: rule.group,
    category: rule.category,
    location: rule.location,
    description: rule.description,
    properties: [],
  };
  return { ...result, properties: convertPropertiesToArray(rule, result) };
};

export const convertDecisionFromFirebase = (decision) => {
  const result: Decision = {
    id: decision.id,
    item: decision.item,
    group: decision.group,
    category: decision.category,
    location: decision.location,
    description: decision.description,
    priority: decision.priority,
    name: decision.name,
    decisionNameType: decision.decisionNameType,
    properties: [],
  };
  return { ...result, properties: convertPropertiesToArray(decision, result) };
};

export const convertDecisionFromFirebaseForEdit = (
  decision: any,
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  const item: Item | undefined = items.find(
    (x: Item) => x.name === decision.item
  );

  const group: Group | undefined = groups.find(
    (x: Group) => x.name === decision.group
  );

  const category: Category | undefined = categories.find(
    (x: Category) => x.name === decision.category
  );

  const result: Decision = {
    id: decision.id,
    item: item?.id ?? '',
    group: group?.id ?? '',
    category: category?.id ?? '',
    location: decision.location,
    description: decision.description,
    priority: decision.priority,
    name: decision.name,
    decisionNameType: decision.decisionNameType,
    properties: [],
  };

  const newProperties: string[] = properties.flatMap((x) =>
    convertPropertiesToArray(decision, result).find(
      (y) => y.toLowerCase() === x.name.toLowerCase()
    )
      ? [x.id]
      : []
  );

  return { ...result, properties: newProperties };
};

export const convertRuleFromFirebaseForEdit = (
  rule: any,
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  const item: Item | undefined = items.find(
    (x: Item) => x.name === rule.item
  );

  const group: Group | undefined = groups.find(
    (x: Group) => x.name === rule.group
  );

  const category: Category | undefined = categories.find(
    (x: Category) => x.name === rule.category
  );

  const result: Rule = {
    id: rule.id,
    item: item?.id ?? '',
    group: group?.id ?? '',
    category: category?.id ?? '',
    location: rule.location,
    description: rule.description,
    properties: [],
  };

  const newProperties: string[] = properties.flatMap((x) =>
    convertPropertiesToArray(rule, result).find(
      (y) => y.toLowerCase() === x.name.toLowerCase()
    )
      ? [x.id]
      : []
  );

  return { ...result, properties: newProperties };
};