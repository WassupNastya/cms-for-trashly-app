import { Category, Decision, Group, Item, Property, Rule } from 'data/model';

const getMapsById = (
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  const itemsMap = items.reduce((obj, item) => {
    obj[item.id] = item.name;
    return obj;
  }, {});

  const groupsMap = groups.reduce((obj, group) => {
    obj[group.id] = group.name;
    return obj;
  }, {});

  const categoriesMap = categories.reduce((obj, category) => {
    obj[category.id] = category.name;
    return obj;
  }, {});

  const propertiesMap = properties.reduce((obj, property) => {
    obj[property.id] = property.name;
    return obj;
  }, {});

  return { itemsMap, groupsMap, categoriesMap, propertiesMap };
};

/**
 * Convert decision from Firebase
 * Replace item id with name
 * Replace group id with name
 * Replace categories id with name
 * Replace properties id with name
 */
export const convertDecisionFromFirebase = (
  initialDecision: Decision,
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  const { itemsMap, groupsMap, categoriesMap, propertiesMap } = getMapsById(
    items,
    groups,
    categories,
    properties
  );
  const decision = { ...initialDecision };

  decision.item = decision.item == null ? '' : itemsMap[decision.item] ?? '';
  decision.group = decision.group == null ? '' : groupsMap[decision.group] ?? '';
  decision.category =
  decision.category == null ? '' : categoriesMap[decision.category] ?? '';
  decision.properties =
  decision.properties == null
      ? []
      : decision.properties.flatMap((id) =>
          propertiesMap[id] ? [propertiesMap[id]] : []
        );

  return decision;
};

const getMapsByName = (
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  const itemsMap = items.reduce((obj, item) => {
    obj[item.name] = item.id;
    return obj;
  }, {});

  const groupsMap = groups.reduce((obj, group) => {
    obj[group.name] = group.id;
    return obj;
  }, {});

  const categoriesMap = categories.reduce((obj, category) => {
    obj[category.name] = category.id;
    return obj;
  }, {});

  const propertiesMap = properties.reduce((obj, property) => {
    obj[property.name] = property.id;
    return obj;
  }, {});

  return { itemsMap, groupsMap, categoriesMap, propertiesMap };
};

/**
 * Convert decision to Firebase
 * Replace item name with id
 * Replace group name with id
 * Replace category name with id
 * Replace property name with id
 */
export const convertDecisionToFirebase = (
  initialDecision: Decision,
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  const { itemsMap, groupsMap, categoriesMap, propertiesMap } = getMapsByName(
    items,
    groups,
    categories,
    properties
  );
  const decision = { ...initialDecision };
  
  decision.item = itemsMap[decision.item] ?? '';
  decision.group = groupsMap[decision.group] ?? '';
  decision.category = categoriesMap[decision.category] ?? '';
  decision.properties = decision.properties.flatMap((property) =>
    propertiesMap[property] ? [propertiesMap[property]] : []
  );

  return decision;
};
