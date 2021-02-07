import { Type } from './enums';
import { Decision, DecisionView, Rule, RuleView } from './model';

export const convertRuleType: (rule: Rule) => RuleView = (rule) => {
  const result = {
    id: rule.id,
    location: rule.location,
    description: rule.description,
  };
  if (rule.item)
    return {
      ...result,
      type: Type.ForItem,
      ruleFor: rule.item,
    };
  if (rule.group)
    return {
      ...result,
      type: Type.ForGroup,
      ruleFor: rule.group,
    };
  if (rule.category)
    return {
      ...result,
      type: Type.ForCategory,
      ruleFor: rule.category,
    };
  else
    return {
      ...result,
      type: Type.ForPropertiesOnly,
      ruleFor: '',
    }; // TODO: handle properties
};

export const convertDecisionType: (decision: Decision) => DecisionView = (
  decision
) => {
  const result = {
    id: decision.id,
    location: decision.location,
    description: decision.description,
    priority: decision.priority,
    decisionNameType: decision.decisionNameType,
    name: decision.name
  };
  if (decision.item)
    return {
      ...result,
      type: Type.ForItem,
      decisionFor: decision.item,
    };
  if (decision.group)
    return {
      ...result,
      type: Type.ForGroup,
      decisionFor: decision.group,
    };
  if (decision.category)
    return {
      ...result,
      type: Type.ForCategory,
      decisionFor: decision.category,
    };
  else
    return {
      ...result,
      type: Type.ForPropertiesOnly,
      decisionFor: '',
    }; // TODO: handle properties
};

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
