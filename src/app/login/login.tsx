import React, { useCallback, useMemo } from 'react';
import { Typography } from '@material-ui/core';
import backgroundImage from 'assets/background.svg';
import { useHistory, useLocation } from 'react-router-dom';

import { SignIn } from './signIn';
import { SignUp } from './signUp';

import './login.scss';

export const Login: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const linkSignUp = useCallback(
    () => (
      <Typography variant="body1" className="sign-link">
        New member?&nbsp;
        <span onClick={() => history.push('/login/new')}>Sign up</span>
      </Typography>
    ),
    [history]
  );

  const linkSignIn = useCallback(
    () => (
      <Typography variant="body1" className="sign-link">
        Already a member?&nbsp;
        <span onClick={() => history.push('/login')}>Sign in</span>
      </Typography>
    ),
    [history]
  );

  const isSignUp = useMemo(() => location.pathname.includes('/new'), [
    location,
  ]);

  const form = useMemo(() => (isSignUp ? <SignUp /> : <SignIn />), [isSignUp]);

  const link = useMemo(() => (isSignUp ? linkSignIn() : linkSignUp()), [
    isSignUp,
    linkSignIn,
    linkSignUp,
  ]);

  const title = useMemo(() => (isSignUp ? 'Sign up' : 'Sign in'), [isSignUp]);

  return (
    <div className="login">
      <div className="login-background">
        <img src={backgroundImage} />
      </div>
      <div className="login-form-wrapper">
        <div className="login-form">
          <Typography variant="h4" style={{ fontWeight: 500 }}>
            {title} to Trashly
          </Typography>
          {link}
          {form}
        </div>
      </div>
    </div>
  );
};
