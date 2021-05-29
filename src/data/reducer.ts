import { ActionType } from './actionType';
import {
  Action,
  Category,
  Decision,
  Group,
  Item,
  Property,
  Rule,
  User,
} from './model';

export interface StateType {
  locations: Location[];
  items: Item[];
  groups: Group[];
  categories: Category[];
  properties: Property[];
  rules: Rule[];
  decisions: Decision[];
  users: User[];
}

const InitialState: StateType = {
  locations: [],
  items: [],
  groups: [],
  categories: [],
  properties: [],
  rules: [],
  decisions: [],
  users: []
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
    case ActionType.SETUSERS: {
      return { ...state, users: action.data };
    }
    default:
      return state;
  }
};
