import { ActionType } from './actionType';
import {
  Action,
  Category,
  DecisionView,
  Group,
  Item,
  Property,
  RuleView,
} from './model';

export interface StateType {
  locations: Location[];
  items: Item[];
  groups: Group[];
  categories: Category[];
  properties: Property[];
  rules: RuleView[];
  decisions: DecisionView[];
}

const InitialState: StateType = {
  locations: [],
  items: [],
  groups: [],
  categories: [],
  properties: [],
  rules: [],
  decisions: [],
};

export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETLOCATIONS: {
      return { ...state, locations: action.data };
    }
    case ActionType.SETITEMS: {
      return { ...state, items: action.data };
    }
    case ActionType.SETGROUPS: {
      return { ...state, groups: action.data };
    }
    case ActionType.SETPROPERTIES: {
      return { ...state, properties: action.data };
    }
    case ActionType.SETRULES: {
      return { ...state, rules: action.data };
    }
    case ActionType.SETDECISIONS: {
      return { ...state, decisions: action.data };
    }
    case ActionType.SETCATEGORIES: {
      return { ...state, categories: action.data };
    }
    default:
      return state;
  }
};
