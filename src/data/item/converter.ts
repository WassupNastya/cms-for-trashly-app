import { Category, Group, Item, Property } from 'data/model';

const getMapsById = (
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
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

  return { groupsMap, categoriesMap, propertiesMap };
};

/**
 * Convert item from Firebase
 * Replace group id with name
 * Replace categories id with name
 * Replace properties id with name
 */
export const convertItemFromFirebase = (
  initialItem: Item,
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  const { groupsMap, categoriesMap, propertiesMap } = getMapsById(
    groups,
    categories,
    properties
  );
  const item = { ...initialItem };

  item.group = item.group == null ? '' : groupsMap[item.group] ?? '';
  item.categories =
    item.categories == null
      ? []
      : item.categories.flatMap((id) =>
          categoriesMap[id] ? [categoriesMap[id]] : []
        );
  item.properties =
    item.properties == null
      ? []
      : item.properties.flatMap((id) =>
          propertiesMap[id] ? [propertiesMap[id]] : []
        );

  return item;
};



const getMapsByName = (
    groups: Group[],
    categories: Category[],
    properties: Property[]
  ) => {
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
  
    return { groupsMap, categoriesMap, propertiesMap };
  };

  /**
   * Convert item to Firebase
   * Replace group name with id
   * Replace category name with id
   * Replace property name with id
   */
  export const convertItemToFirebase = (
    initialItem: Item,
    groups: Group[],
    categories: Category[],
    properties: Property[]
  ) => {
    const { groupsMap, categoriesMap, propertiesMap } = getMapsByName(
      groups,
      categories,
      properties
    );
  
    const item = { ...initialItem };
    item.group = groupsMap[item.group] ?? '';
    item.categories = item.categories.flatMap(category => categoriesMap[category] ? [categoriesMap[category]] : []);
    item.properties = item.properties.flatMap(property => propertiesMap[property] ? [propertiesMap[property]] : []);
    
    return item;
  };
