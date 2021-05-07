import React, { ChangeEvent, useCallback, useState } from 'react';
import { UserData } from 'data/model';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { useAuth } from 'app/common/authProvider';
import google from 'assets/google.svg';
import { useForm } from 'react-hook-form';

import { ErrorString } from './errorString';

import './SignForm.scss';

export const SignUp: React.FC = () => {
  const {
    signInWithGoogle,
    createUserWithEmailAndPassword,
    error,
    loading,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onBlur' });

  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
  });

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof UserData
    ) => {
      setUserData({ ...userData, [field]: e.target.value });
    },
    [userData]
  );

  const onCreateAccount = () => {
    createUserWithEmailAndPassword(userData.email, userData.password);
  };

  return (
    <div className="sign-form-wrapper">
      <Button
        variant="outlined"
        onClick={signInWithGoogle}
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
        onClick={handleSubmit(onCreateAccount)}
        disabled={loading}
      >
        Create an account
      </Button>
    </div>
  );
};
