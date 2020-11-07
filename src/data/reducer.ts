import { ActionType } from './actionType';
import { Action } from './model';

export interface StateType {
  name?: string;
}

const InitialState: StateType = {};

export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETDATA: {
      return { ...state, name: action.data };
    }
    default:
      return state;
  }
};
