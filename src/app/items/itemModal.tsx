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
import { useDispatch, useSelector } from 'react-redux';
import { Item } from 'data/model';
import { useItems } from 'app/common/useData';
import { createItemAsync, getItemAsync } from 'data/actions';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { GroupSelect } from 'app/common/select/groupSelect';
import { CategoriesSelect } from 'app/common/select/categoriesSelect';
import { PropertiesSelect } from 'app/common/select/propertiesSelect';
import { emptyItem } from 'app/common/emptyStates';
import { StoreType } from 'core/rootReducer';
import { convertItemToFirebase } from 'data/item/converter';
import { useForm } from 'react-hook-form';
import { ErrorString } from 'app/common/errorString/errorString';
import { useResponse } from 'app/common/useResponse';

interface Props {
  hide: () => void;
  id?: string;
  onChangeSubItem?: (name: string) => void;
}

export const ItemModal: React.FC<Props> = ({ id, hide, onChangeSubItem }) => {
  const dispatch = useDispatch();
  const getItems = useItems({ needEffect: false });
  const showSaveSnack = useSaveSnack();
  const handleResponse = useResponse();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onBlur' });

  const [state, setState] = useState<Item>(emptyItem);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDuplicateTooltip, setShowDuplicateTooltip] = useState(false);

  const { groups, categories, properties } = useSelector(
    (state: StoreType) => state.data
  );

  const title = useMemo(() => {
    return id == null ? 'Create' : 'Edit';
  }, [id]);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof Item
    ) => {
      if (showDuplicateTooltip) setShowDuplicateTooltip(false);
      setState({ ...state, [field]: e.target.value });
    },
    [state, showDuplicateTooltip]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createItemAsync(
        convertItemToFirebase(state, groups, categories, properties),
        (response) => {
          setLoading(false);
          handleResponse(
            {
              onOk: () => {
                setSuccess(true);
                getItems();
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
        }
      )
    );
  }, [
    dispatch,
    state,
    showSaveSnack,
    hide,
    onChangeSubItem,
    getItems,
    handleResponse,
    categories,
    groups,
    properties,
  ]);

  const getItem = useCallback(
    (id: string) => {
      dispatch(getItemAsync(id, (response) => setState(response)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id != null) getItem(id);
  }, [getItem, id]);

  const disabled = loading || success;

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Item' : 'Item'}</div>
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
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            value={state.name}
            onChange={(e) => handleChange(e, 'name')}
            disabled={disabled}
            color="secondary"
            margin="dense"
            fullWidth
            error={errors.name != null}
          ></TextField>
        </Tooltip>
        <ErrorString
          isError={errors.name != null}
          errorMessage="Name is empty"
        />
        <TextField
          id="outlined-aliases"
          label="Aliases"
          variant="outlined"
          size="small"
          value={state.aliases}
          onChange={(e) => handleChange(e, 'aliases')}
          disabled={disabled}
          margin="dense"
          fullWidth
          color="secondary"
        ></TextField>
        <GroupSelect
          value={state.group}
          onChange={(group) => setState({ ...state, group })}
          disabled={disabled}
        />
        <CategoriesSelect
          value={state.categories}
          onChange={(categories: string[]) =>
            setState((state) => ({ ...state, categories }))
          }
          onChangeSubItem={(category) =>
            setState((state) => ({
              ...state,
              categories: [...state.categories, category],
            }))
          }
          disabled={disabled}
        />
        <PropertiesSelect
          value={state.properties}
          onChange={(properties: string[]) =>
            setState((state) => ({ ...state, properties }))
          }
          onChangeSubItem={(property) =>
            setState((state) => ({
              ...state,
              properties: [...state.properties, property],
            }))
          }
          disabled={disabled}
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
