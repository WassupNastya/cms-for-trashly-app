import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Property } from 'data/model';
import { createPropertyAsync, getPropertyAsync } from 'data/actions';
import { useProperties } from 'app/common/useData';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';

interface Props {
  hide: () => void;
  id?: string;
  onChangeSubItem?: (name: string) => void;
}

export const PropertyModal: React.FC<Props> = ({ id, hide, onChangeSubItem }) => {
  const dispatch = useDispatch();
  const getProperties = useProperties({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Property>({
    name: '',
    id: '',
  });
  const [success, setSuccess] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Create' : 'Rename';
  }, [id]);

  const getProperty = useCallback(
    (id: string) => {
      dispatch(getPropertyAsync(id, (model) => setState(model)));
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
      createPropertyAsync(state, () => {
        setLoading(false);
        setSuccess(true);
        getProperties();
        showSaveSnack();
        onChangeSubItem?.(state.name);
        hide();
      })
    );
  }, [dispatch, state, getProperties, showSaveSnack, hide, onChangeSubItem]);

  useEffect(() => {
    if (id != null) getProperty(id);
  }, [getProperty, id]);

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Property' : 'Property'}</div>
        <Close onClick={hide} />
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="outlined-name"
          label="Name"
          variant="outlined"
          value={state.name}
          onChange={handleChange}
          disabled={loading || success}
          size="small"
          color="secondary"
        />
        <Button fullWidth onClick={onSave} disabled={loading || success}>
          {loading && (
            <CircularProgress
              style={{ position: 'absolute', color: 'white' }}
              size={24}
            />
          )}
          {title}
        </Button>
      </DialogContent>
    </div>
  );
};
