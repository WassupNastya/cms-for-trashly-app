import { convertPropertiesToField } from 'data/converters';
import { Category, Group, Item, Property, Rule } from 'data/model';

import { convertRuleFromFirebase } from './converter';

export interface RuleForDownload {
  id: number;
  name: string;
  description: string;
  item?: string;
  group?: string;
  category?: string;
  [key: string]: any;
}

export const prepareRuleForDownload = (
  initialRule: Rule,
  items: Item[],
  groups: Group[],
  categories: Category[],
  properties: Property[]
) => {
  let rule = convertRuleFromFirebase(
    initialRule,
    items,
    groups,
    categories,
    properties
  );
  const ruleProperties = convertPropertiesToField(rule.properties);
  delete rule.properties;
  rule = { ...rule, ...ruleProperties };

  const results: RuleForDownload[] = [];
  if (rule.item != null && rule.group == null) {
    // rule for item
    const result: RuleForDownload = {
      ...rule,
      id: 0,
    };
    delete result['group'];
    results.push(result);
  } else if (rule.group != null && rule.item == null) {
    // rule for group
    const result: RuleForDownload = {
      ...rule,
      id: 0,
    };
    delete result['item'];
    results.push(result);
  } else {
    // one rule for item and one rule for group
    const itemResult: RuleForDownload = {
      ...rule,
      id: 0,
    };
    delete itemResult['group'];

    const groupResult: RuleForDownload = {
      ...rule,
      id: 0,
    };
    delete groupResult['item'];

    results.push(itemResult, groupResult);
  }
  return results;
};
