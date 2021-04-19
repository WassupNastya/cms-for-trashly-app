import { convertPropertiesToField } from 'data/converters';
import { isEmpty } from 'data/helper';
import { Category, Decision, Group, Item, Property } from 'data/model';


import { convertDecisionFromFirebase } from './converter';

export interface DecisionForDownload {
  id: number;
  name: string;
  decisionNameType: string;
  description: string;
  priority: string;
  item?: string;
  group?: string;
  category?: string;
  location: string;
  [key: string]: any;
}

export const prepareDecisionForDownload = (
  initialDecision: Decision,
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  let decision = convertDecisionFromFirebase(
    initialDecision,
    items,
    groups,
    categories,
    properties
  );
  const decisionProperties = convertPropertiesToField(decision.properties);
  delete decision.properties;
  decision = { ...decision, ...decisionProperties };
  if (isEmpty(decision.category)) delete decision['category'];

  const results: DecisionForDownload[] = [];
  if (isEmpty(decision.item) && isEmpty(decision.group)) {
    // decision for properties
    const result: DecisionForDownload = {
      ...decision,
      id: 0
  };
  delete result['item'];
  delete result['group'];
  results.push(result);
  } else if (!isEmpty(decision.item) && isEmpty(decision.group)) {
      // decision for item
      const result: DecisionForDownload = {
          ...decision,
          id: 0
      };
      delete result['group'];
      results.push(result);
  } else if (!isEmpty(decision.group) && isEmpty(decision.item)) {
      // decision for group
      const result: DecisionForDownload = {
          ...decision,
          id: 0
      };
      delete result['item'];
      results.push(result);
  } else {
      // one decision for item and one decision for group
      const itemResult: DecisionForDownload = {
          ...decision,
          id: 0
      };
      delete itemResult['group'];

      const groupResult: DecisionForDownload = {
        ...decision,
        id: 0
      };
      delete groupResult['group'];

      results.push(itemResult, groupResult);
  }
  
  return results;
};
