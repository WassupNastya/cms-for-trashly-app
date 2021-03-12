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
import { Group } from 'data/model';
import { createGroupAsync, getGroupAsync } from 'data/actions';
import { useGroups } from 'app/common/useData';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';

interface Props {
  hide: () => void;
  id?: string;
  onChangeSubItem?: (name: string) => void;
}

export const GroupModal: React.FC<Props> = ({ id, hide, onChangeSubItem }) => {
  const dispatch = useDispatch();
  const getGroups = useGroups({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Group>({
    name: '',
    id: '',
  });
  const [success, setSuccess] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Create' : 'Rename';
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
        showSaveSnack();
        onChangeSubItem?.(state.name);
        hide();
      })
    );
  }, [dispatch, state, getGroups, showSaveSnack, hide, onChangeSubItem]);

  useEffect(() => {
    if (id != null) getGroup(id);
  }, [getGroup, id]);

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
      <div>{id == null ? 'New Group' : 'Group'}</div>
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
