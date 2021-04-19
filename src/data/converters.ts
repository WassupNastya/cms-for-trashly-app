import lodash from 'lodash';

import { isEmpty } from './helper';

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
