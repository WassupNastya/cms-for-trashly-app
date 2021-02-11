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
import { createPropertyAsync } from 'data/actions';
import classnames from 'classnames';
import { useProperties } from 'app/common/useData';

import './createProperty.scss';

interface Props {
  id?: string;
}

export const CreateProperty: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getProperties = useProperties({ needEffect: false });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Group>({
    name: '',
    id: '',
  });
  const [success, setSuccess] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Add property' : 'Edit property';
  }, [id]);

  const getProperty = useCallback((id: string) => {
    console.log('Edit: ', id);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({ ...state, name: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createPropertyAsync(state, () => {
        setLoading(false);
        setSuccess(true);
        getProperties();
      })
    );
  }, [dispatch, state, getProperties]);

  useEffect(() => {
    if (id != null) getProperty(id);
  }, [getProperty, id]);

  return (
    <Grid className="createProperty">
      <div className="title">{title}</div>
      <TextField
        id="outlined-name"
        label="Name"
        variant="outlined"
        size="small"
        value={state.name}
        onChange={handleChange}
        disabled={loading || success}
      />
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
