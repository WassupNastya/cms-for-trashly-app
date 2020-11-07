import { ActionType } from './actionType';
import { Action } from './model';

export const setData: (data: string) => Action = (data) => {
  return { type: ActionType.SETDATA, data };
};
