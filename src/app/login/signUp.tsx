import React, { ChangeEvent, useCallback, useState } from 'react';
import { UserData } from 'data/model';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { useAuth } from 'app/common/authProvider';
import google from 'assets/google.svg';
import { useForm } from 'react-hook-form';

import { ErrorString } from './errorString';

import './form.scss';

export const SignUp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onBlur' });

  const { loginWithGoogle, signUpWithEmailAndPassword } = useAuth();

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof UserData
    ) => {
      setUserData({ ...userData, [field]: e.target.value });
    },
    [userData]
  );

  const login = useCallback(() => {
    setLoading(true);
    loginWithGoogle()
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [loginWithGoogle]);

  const signUp = useCallback(() => {
    setLoading(true);
    signUpWithEmailAndPassword(userData.email, userData.password)
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [userData, signUpWithEmailAndPassword]);

  return (
    <div className="sign-form-wrapper">
      <Button
        variant="outlined"
        onClick={login}
        className="google-button"
        disabled={loading}
      >
        <img src={google} alt="Login with Google." />
        Login with Google
      </Button>
      <div className="divider">
        <span>or</span>
      </div>
      <Tooltip
        title={
          <span style={{ fontSize: '0.7rem' }}>{errors.email?.message}</span>
        }
        placement="left"
        arrow
        open={errors.email != null}
      >
        <TextField
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email',
            },
          })}
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          value={userData.email}
          onChange={(e) => handleChange(e, 'email')}
          size="small"
          color="secondary"
          style={{ marginTop: '0.5rem' }}
          disabled={loading}
        />
      </Tooltip>
      <Tooltip
        title={
          <span style={{ fontSize: '0.7rem' }}>{errors.password?.message}</span>
        }
        placement="left"
        arrow
        open={errors.password != null}
      >
        <TextField
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 6,
              message: 'Password should have at least 6 characters',
            },
          })}
          type="password"
          id="password"
          label="Password"
          variant="outlined"
          value={userData.password}
          onChange={(e) => handleChange(e, 'password')}
          size="small"
          color="secondary"
          style={{ marginTop: '0.5rem', marginBottom: '0.8rem' }}
          disabled={loading}
        />
      </Tooltip>
      {error && <ErrorString message={error} />}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleSubmit(signUp)}
        disabled={loading}
      >
        Create an account
      </Button>
    </div>
  );
};
