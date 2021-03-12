import lodash from 'lodash';

import { isEmpty } from './helper';
import { Decision, Item, Rule } from './model';

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
    categories: item.categories ?? [],
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
