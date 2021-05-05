import { Response } from 'data/enums';

interface ActionsOnResponse {
  onOk: () => void;
  onDuplicate: () => void;
  onServerError: () => void;
}

export const useResponse = () => {
  return (actions: ActionsOnResponse, response: string) => {
    if (response === Response.Ok) actions.onOk();
    else if (response === Response.Duplicate) actions.onDuplicate();
    else if (response === Response.ServerError) actions.onServerError();
  };
};
