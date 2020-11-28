import { ActionType } from './actionType';
import { Action } from './model';

export interface StateType {
  locations: Location[];
}

const InitialState: StateType = { locations: [] };

export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETLOCATIONS: {
      return { ...state, locations: action.data };
    }
    default:
      return state;
  }
};
