import { convertPropertiesToField } from "data/converters";
import { Category, Group, Item, Property } from "data/model";

import { convertItemFromFirebase } from "./converter";

export interface ItemForDownload {
    id: number;
    name: string;
    aliases: string;
    group?: string;
    category?: string;
    [key: string]: any;
  }
  
  export const prepareItemForDownload = (
    initialItem: Item,
    groups: Group[],
    categories: Category[],
    properties: Property[]
  ) => {
    let item = convertItemFromFirebase(
      initialItem,
      groups,
      categories,
      properties
    );
    const itemProperties = convertPropertiesToField(item.properties);
    delete item.properties;
    item = { ...item, ...itemProperties };
  
    const results: ItemForDownload[] = [];
    if (item.categories == null || item.categories.length === 0) {
      const result: ItemForDownload = {
        ...item,
        id: 0,
      };
      delete result['categories'];
      results.push(result);
    } else {
      // Create new item for each category
      item.categories.forEach((category) => {
        const result: ItemForDownload = {
          ...item,
          id: 0,
          category,
        };
        delete result['categories'];
        results.push(result);
      });
    }
    return results;
  };