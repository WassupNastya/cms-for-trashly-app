import { useAuth } from 'app/common/authProvider';
import React, { ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  path: string;
  component: ReactElement;
}

export const ProtectedRoute = (props: Props) => {
  const { user } = useAuth();

  return (
    <Route
      exact
      path={props.path}
      component={() => (user ? props.component : <Redirect to="/login" />)}
    />
  );
};
