import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Rule, User } from 'data/model';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { Role } from 'data/enums';
import { createUserAsync, getUserByIdAsync } from 'data/actions';
import { useUsers } from 'app/common/useData';

import { RoleSelect } from './components/roleSelect';

interface Props {
  hide: () => void;
  id?: string;
}

export const UserModal: React.FC<Props> = ({ id, hide }) => {
  const dispatch = useDispatch();
  const showSaveSnack = useSaveSnack();

  const getUsers = useUsers({ needEffect: false });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<User>({
    id,
    name: '',
    role: Role.Viewer,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof Rule
    ) => {
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const disabled = loading || success;

  const getUser = useCallback(
    (id: string) => {
      dispatch(
        getUserByIdAsync(id, (response) => {
          setState(response);
        })
      );
    },
    [dispatch]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createUserAsync(state, () => {
        setLoading(false);
        setSuccess(true);
        getUsers();
        showSaveSnack();
        hide();
      })
    );
  }, [dispatch, state, showSaveSnack, hide, getUsers]);

  useEffect(() => {
    getUser(id);
  }, [getUser, id]);

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
        <div>Change role</div>
        <Close onClick={hide} />
      </DialogTitle>
      <DialogContent>
        <TextField
          multiline
          id="outlined-name"
          label="Email"
          variant="outlined"
          size="small"
          value={state.name}
          onChange={(e) => handleChange(e, 'name')}
          disabled
          color="secondary"
          fullWidth
          margin="dense"
        ></TextField>
        <RoleSelect
          value={state.role}
          onChange={(role) => setState((state) => ({ ...state, role }))}
          disabled={disabled}
        />
        <Button fullWidth onClick={onSave} disabled={loading || success}>
          {loading && (
            <CircularProgress
              style={{ position: 'absolute', color: 'white' }}
              size={24}
            />
          )}
          Change
        </Button>
      </DialogContent>
    </div>
  );
};
