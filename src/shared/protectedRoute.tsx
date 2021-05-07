import React, { ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  path: string;
  user: any; // TODO: make context
  component: ReactElement;
}

export const ProtectedRoute = (props: Props) => {
  return (
    <Route
      path={props.path}
      component={() => (props.user ? props.component : <Redirect to="/login" />)}
    />
  );
};
