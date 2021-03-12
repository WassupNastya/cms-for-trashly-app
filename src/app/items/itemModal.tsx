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
import { useDispatch, useSelector } from 'react-redux';
import { Item } from 'data/model';
import {
  useCategories,
  useGroups,
  useItems,
  useProperties,
} from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createItemAsync, getItemAsync } from 'data/actions';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { SelectField } from 'shared/selectField';
import { Tab } from 'data/enums';

interface Props {
  hide: () => void;
  id?: string;
  onChangeSubItem?: (name: string) => void;
}

export const ItemModal: React.FC<Props> = ({ id, hide, onChangeSubItem }) => {
  const dispatch = useDispatch();
  const getItems = useItems({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const getGroups = useGroups({ needEffect: true });
  const getCategories = useCategories({ needEffect: true });
  const getProperties = useProperties({ needEffect: true });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Item>({
    name: '',
    id: '',
    group: '',
    categories: [],
    properties: [],
    aliases: '',
  });
  const [success, setSuccess] = useState(false);

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
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createItemAsync(
        {
          ...state,
        },
        () => {
          setLoading(false);
          setSuccess(true);
          getItems();
          showSaveSnack();
          onChangeSubItem?.(state.name);
          hide();
        }
      )
    );
  }, [dispatch, state, getItems, showSaveSnack, hide, onChangeSubItem]);

  const getItem = useCallback(
    (id: string) => {
      dispatch(
        getItemAsync(id, (response) => {
          const newCategories: string[] = categories.flatMap((x) =>
            response.categories.find(
              (y) => y.toLowerCase() === x.name.toLowerCase()
            )
              ? [x.name]
              : []
          );

          const newProperties: string[] = properties.flatMap((x) =>
            response.properties.find(
              (y) => y.toLowerCase() === x.name.toLowerCase()
            )
              ? [x.name]
              : []
          );

          const newResponse = { ...response };
          newResponse.group = response.group ?? '';
          newResponse.categories = newCategories;
          newResponse.properties = newProperties;

          setState(newResponse);
        })
      );
    },
    [dispatch, properties, categories]
  );

  useEffect(() => {
    if (id != null) getItem(id);
  }, [getItem, id]);

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Item' : 'Item'}</div>
        <Close onClick={hide} />
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-name"
          label="Name"
          variant="outlined"
          size="small"
          value={state.name}
          onChange={(e) => handleChange(e, 'name')}
          disabled={loading || success}
          color="secondary"
          margin="dense"
          fullWidth
        ></TextField>
        <TextField
          id="outlined-aliases"
          label="Aliases"
          variant="outlined"
          size="small"
          value={state.aliases}
          onChange={(e) => handleChange(e, 'aliases')}
          disabled={loading || success}
          margin="dense"
          fullWidth
          color="secondary"
        ></TextField>
        <SelectField<string>
          label="Group"
          options={groups.map((x) => x.name)}
          getOptionLabel={(option: string) => option}
          value={state.group}
          onChange={(group) => setState({ ...state, group: group as string })}
          disabled={loading || success}
          helperText={Tab.Groups}
          onClose={getGroups}
          helperTextLabel="Create group"
          onChangeSubItem={(group) =>
            setState({ ...state, group: group as string })
          }
        />
        <SelectField<string>
          multiple
          label="Categories"
          options={categories.map((x) => x.name)}
          getOptionLabel={(option: string) => option}
          value={state.categories}
          onChange={(categories) =>
            setState({ ...state, categories: categories as string[] })
          }
          disabled={loading || success}
          helperText={Tab.Categories}
          onClose={getCategories}
          helperTextLabel="Create category"
          onChangeSubItem={(category) =>
            setState({ ...state, categories: [...state.categories, category] })
          }
        />
        <SelectField<string>
          multiple
          label="Properties"
          options={properties.map((x) => x.name)}
          getOptionLabel={(option: string) => option}
          value={state.properties}
          onChange={(properties) =>
            setState({ ...state, properties: properties as string[] })
          }
          disabled={loading || success}
          helperText={Tab.Properties}
          onClose={getProperties}
          helperTextLabel="Create property"
          onChangeSubItem={(property) =>
            setState({ ...state, properties: [...state.properties, property] })
          }
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
