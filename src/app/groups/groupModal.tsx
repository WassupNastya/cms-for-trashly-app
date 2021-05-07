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
  Tooltip,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Group } from 'data/model';
import { createGroupAsync, getGroupAsync } from 'data/actions';
import { useGroups } from 'app/common/useData';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { useForm } from 'react-hook-form';
import { ErrorString } from 'app/common/errorString/errorString';
import { useResponse } from 'app/common/useResponse';

interface Props {
  hide: () => void;
  id?: string;
  onChangeSubItem?: (name: string) => void;
}

export const GroupModal: React.FC<Props> = ({ id, hide, onChangeSubItem }) => {
  const dispatch = useDispatch();
  const getGroups = useGroups({ needEffect: false });
  const showSaveSnack = useSaveSnack();
  const handleResponse = useResponse();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onBlur' });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Group>({
    name: '',
    id: '',
  });
  const [success, setSuccess] = useState(false);
  const [showDuplicateTooltip, setShowDuplicateTooltip] = useState(false);

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
      if (showDuplicateTooltip) setShowDuplicateTooltip(false);
      setState({ ...state, name: e.target.value });
    },
    [state, showDuplicateTooltip]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createGroupAsync(state, (response) => {
        setLoading(false);
        handleResponse(
          {
            onOk: () => {
              setSuccess(true);
              getGroups();
              showSaveSnack();
              onChangeSubItem?.(state.name);
              hide();
            },
            onDuplicate: () => setShowDuplicateTooltip(true),
            onServerError: () => {
              console.log('Server error!');
            },
          },
          response
        );
      })
    );
  }, [
    dispatch,
    state,
    showSaveSnack,
    hide,
    onChangeSubItem,
    getGroups,
    handleResponse,
  ]);

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
        <Tooltip
          title={
            <span style={{ fontSize: '0.8rem' }}>
              Sorry, group with the same name
              <br />
              already exists 😞
            </span>
          }
          placement="right"
          arrow
          open={showDuplicateTooltip}
        >
          <TextField
            {...register('name', { required: true })}
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            value={state.name}
            onChange={handleChange}
            disabled={loading || success}
            size="small"
            color="secondary"
            error={errors.name != null}
          />
        </Tooltip>
        <ErrorString
          isError={errors.name != null}
          errorMessage="Name is empty"
        />
        <Button
          fullWidth
          onClick={handleSubmit(() => onSave())}
          disabled={loading || success}
        >
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
