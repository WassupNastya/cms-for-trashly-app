import { ActionType } from './actionType';
import {
  Action,
  DecisionView,
  ItemsGroup,
  ItemsItem,
  ItemsProperty,
  RuleView,
} from './model';

export interface StateType {
  locations: Location[];
  itemsItems: ItemsItem[];
  itemsGroups: ItemsGroup[];
  itemsProperties: ItemsProperty[];
  rules: RuleView[];
  decisions: DecisionView[];
}

const InitialState: StateType = {
  locations: [],
  itemsItems: [],
  itemsGroups: [],
  itemsProperties: [],
  rules: [],
  decisions: [],
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
    case ActionType.SETRULES: {
      return { ...state, rules: action.data };
    }
    case ActionType.SETDECISIONS: {
      return { ...state, decisions: action.data };
    }
    default:
      return state;
  }
};
