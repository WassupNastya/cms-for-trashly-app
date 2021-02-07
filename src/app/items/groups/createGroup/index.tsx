import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Group } from 'data/model';
import { createGroupAsync, getGroupAsync } from 'data/actions';
import classnames from 'classnames';
import { useGroups } from 'app/common/useData';

import './createGroup.scss';

interface Props {
  id?: string;
}

export const CreateGroup: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getGroups = useGroups({ needEffect: false });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Group>({
    name: '',
    id: '',
  });
  const [success, setSuccess] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Add group' : 'Edit group';
  }, [id]);

  const getGroup = useCallback(
    (id: string) => {
      dispatch(
        getGroupAsync(id, (response) => {
          setState(response);
        })
      );
    },
    [dispatch]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({ ...state, name: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createGroupAsync(state, () => {
        setLoading(false);
        setSuccess(true);
        getGroups();
      })
    );
  }, [dispatch, state, getGroups]);

  useEffect(() => {
    if (id != null) getGroup(id);
  }, [getGroup, id]);

  return (
    <Grid className="createGroup">
      <div className="title">{title}</div>
      <Grid item>
        <TextField
          id="outlined-name"
          label="Name"
          variant="outlined"
          size="small"
          value={state.name}
          onChange={handleChange}
          disabled={loading || success}
        />
      </Grid>
      <div className="buttons">
        <Button
          variant="contained"
          onClick={onSave}
          disabled={loading || success}
          className={classnames({ success: success })}
        >
          {loading && <CircularProgress className="progress" size={24} />}
          {success ? 'Saved' : 'Save'}
        </Button>
      </div>
    </Grid>
  );
};
