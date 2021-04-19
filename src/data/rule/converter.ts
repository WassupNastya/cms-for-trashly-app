import { Category, Group, Item, Property, Rule } from 'data/model';

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
 * Convert rule from Firebase
 * Replace item id with name
 * Replace group id with name
 * Replace categories id with name
 * Replace properties id with name
 */
export const convertRuleFromFirebase = (
  initialRule: Rule,
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
  const rule = { ...initialRule };

  rule.item = rule.item == null ? '' : itemsMap[rule.item] ?? '';
  rule.group = rule.group == null ? '' : groupsMap[rule.group] ?? '';
  rule.category =
    rule.category == null ? '' : categoriesMap[rule.category] ?? '';
  rule.properties =
    rule.properties == null
      ? []
      : rule.properties.flatMap((id) =>
          propertiesMap[id] ? [propertiesMap[id]] : []
        );

  return rule;
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
 * Convert rule to Firebase
 * Replace item name with id
 * Replace group name with id
 * Replace category name with id
 * Replace property name with id
 */
export const convertRuleToFirebase = (
  initialRule: Rule,
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
  const rule = { ...initialRule };
  
  rule.item = itemsMap[rule.item] ?? '';
  rule.group = groupsMap[rule.group] ?? '';
  rule.category = categoriesMap[rule.category] ?? '';
  rule.properties = rule.properties.flatMap((property) =>
    propertiesMap[property] ? [propertiesMap[property]] : []
  );

  return rule;
};
