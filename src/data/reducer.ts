import { ActionType } from './actionType';
import {
  Action,
  DecisionForGroup,
  DecisionForItem,
  DecisionForProperties,
  ItemsGroup,
  ItemsItem,
  ItemsProperty,
  RuleForCategory,
  RuleForGroup,
  RuleForItem,
} from './model';

export interface StateType {
  locations: Location[];
  itemsItems: ItemsItem[];
  itemsGroups: ItemsGroup[];
  itemsProperties: ItemsProperty[];
  rulesForItems: RuleForItem[];
  rulesForGroups: RuleForGroup[];
  rulesForCategories: RuleForCategory[];
  decisionsForItems: DecisionForItem[];
  decisionsForGroups: DecisionForGroup[];
  decisionsForProperties: DecisionForProperties[];
}

const InitialState: StateType = {
  locations: [],
  itemsItems: [],
  itemsGroups: [],
  itemsProperties: [],
  rulesForItems: [],
  rulesForGroups: [],
  rulesForCategories: [],
  decisionsForItems: [],
  decisionsForGroups: [],
  decisionsForProperties: [],
};

export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETLOCATIONS: {
      return { ...state, locations: action.data };
    }
    case ActionType.SETITEMSITEMS: {
      return { ...state, itemsItems: action.data };
    }
    case ActionType.SETITEMSGROUP: {
      return { ...state, itemsGroups: action.data };
    }
    case ActionType.SETITEMSPROPERTIES: {
      return { ...state, itemsProperties: action.data };
    }
    case ActionType.SETRULESFORITEMS: {
      return { ...state, rulesForItems: action.data };
    }
    case ActionType.SETRULESFORGROUPS: {
      return { ...state, rulesForGroups: action.data };
    }
    case ActionType.SETRULESFORCATEGORIES: {
      return { ...state, rulesForCategories: action.data };
    }
    case ActionType.SETDECISIONSFORITEMS: {
      return { ...state, decisionsForItems: action.data };
    }
    case ActionType.SETDECISIONSFORGROUPS: {
      return { ...state, decisionsForGroups: action.data };
    }
    case ActionType.SETDECISIONSFORPROPERTIES: {
      return { ...state, decisionsForProperties: action.data };
    }
    default:
      return state;
  }
};
