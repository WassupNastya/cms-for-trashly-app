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
import { useForm } from 'react-hook-form';
import { ErrorString } from 'app/common/errorString/errorString';

interface Props {
  hide: () => void;
  id?: string;
  onChangeSubItem?: (name: string) => void;
}

export const GroupModal: React.FC<Props> = ({ id, hide, onChangeSubItem }) => {
  const dispatch = useDispatch();
  const getGroups = useGroups({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onBlur' });

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
  }, [dispatch, state, showSaveSnack, hide, onChangeSubItem, getGroups]);

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
        <form onSubmit={handleSubmit(onSave)}>
          <TextField
            {...register('name', { required: true })}
            fullWidth
            id="oname"
            label="Name"
            variant="outlined"
            value={state.name}
            onChange={handleChange}
            disabled={loading || success}
            size="small"
            color="secondary"
            error={errors.name != null}
          />
          <ErrorString isError={errors.name != null} errorMessage="Name is empty" />
          <Button fullWidth type="submit" disabled={loading || success}>
            {loading && (
              <CircularProgress
                style={{ position: 'absolute', color: 'white' }}
                size={24}
              />
            )}
            {title}
          </Button>
        </form>
      </DialogContent>
    </div>
  );
};
