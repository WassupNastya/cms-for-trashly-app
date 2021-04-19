import { Type } from './enums';

export const convertType = (type: number) => {
  switch (type) {
    case Type.ForItem:
      return 'item';
    case Type.ForGroup:
      return 'group';
    case Type.ForCategory:
      return 'category';
    case Type.ForPropertiesOnly:
      return 'properties';
    default:
      return '';
  }
};

export const isEmpty = (value: string | undefined) =>
  value == null || value === '';
