import React, { useMemo, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useAuth } from 'app/common/authProvider';

import { SignIn } from './signIn';
import { SignUp } from './signUp';

import './login.scss';

enum LoginMode {
  SignIn = 0,
  SignUp,
}

export const Login: React.FC = () => {
  const [mode, setMode] = useState(LoginMode.SignIn);

  const { setError } = useAuth();

  const linkSignUp = useMemo(
    () => (
      <Typography variant="body1" className="sign-link">
        New member?&nbsp;
        <span
          onClick={() => {
            setError('');
            setMode(LoginMode.SignUp);
          }}
        >
          Sign up
        </span>
      </Typography>
    ),
    [setError]
  );

  const linkSignIn = useMemo(
    () => (
      <Typography variant="body1" className="sign-link">
        Already a member?&nbsp;
        <span
          onClick={() => {
            setError('');
            setMode(LoginMode.SignIn);
          }}
        >
          Sign in
        </span>
      </Typography>
    ),
    [setError]
  );

  const form = useMemo(
    () => (mode === LoginMode.SignIn ? <SignIn /> : <SignUp />),
    [mode]
  );

  const link = useMemo(
    () => (mode === LoginMode.SignIn ? linkSignUp : linkSignIn),
    [mode, linkSignIn, linkSignUp]
  );

  const title = useMemo(
    () => (mode === LoginMode.SignIn ? 'Sign in' : 'Sign up'),
    [mode]
  );

  return (
    <div className="login">
      <div className="login-background"></div>
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
