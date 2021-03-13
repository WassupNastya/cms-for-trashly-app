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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Group, Item, Property } from 'data/model';
import classnames from 'classnames';
import {
  useCategories,
  useGroups,
  useItems,
  useProperties,
} from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createItemAsync, getItemAsync } from 'data/actions';

import './createItem.scss';

interface Props {
  id?: string;
}

export const CreateItem: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getItems = useItems({ needEffect: false });

  // TODO: make forkJoin
  useGroups({ needEffect: true });
  useCategories({ needEffect: true });
  useProperties({ needEffect: true });

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
    return id == null ? 'Add item' : 'Edit item';
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

  const handleChangeSelect = useCallback(
    (e, field: keyof Item) => {
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    const group: Group | undefined = groups.find(
      (x: Group) => x.id === state.group
    );
    const newCategories: string[] = categories.flatMap((x) =>
      state.categories.includes(x.id) ? [x.name] : []
    );
    const newProperties: string[] = properties.flatMap((x) =>
      state.properties.includes(x.id) ? [x.name] : []
    );

    dispatch(
      createItemAsync(
        {
          ...state,
          group: group?.name ?? '',
          categories: newCategories,
          properties: newProperties,
        },
        () => {
          setLoading(false);
          setSuccess(true);
          getItems();
        }
      )
    );
  }, [dispatch, state, categories, groups, getItems, properties]);

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
    <Grid className="createItem">
      <div className="title">{title}</div>
      <TextField
        id="outlined-name"
        label="Name"
        variant="outlined"
        size="small"
        value={state.name}
        onChange={(e) => handleChange(e, 'name')}
        disabled={loading || success}
      ></TextField>
      <TextField
        id="outlined-aliases"
        label="Aliases"
        variant="outlined"
        size="small"
        value={state.aliases}
        onChange={(e) => handleChange(e, 'aliases')}
        disabled={loading || success}
      ></TextField>
      <FormControl variant="outlined">
        <InputLabel id="group-select-outlined-label">Group</InputLabel>
        <Select
          labelId="group-select-outlined-label"
          id="group-select-outlined"
          value={state.group}
          onChange={(e) => handleChangeSelect(e, 'group')}
          label="Group"
          disabled={loading || success}
        >
          <MenuItem value="" key="-1">
            None
          </MenuItem>
          {groups.map((x: Group, i: number) => (
            <MenuItem value={x.id} key={i}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel id="category-select-outlined-label">Category</InputLabel>
        <Select
          labelId="category-select-outlined-label"
          id="category-select-outlined"
          value={state.categories}
          onChange={(e) => handleChangeSelect(e, 'categories')}
          label="Category"
          disabled={loading || success}
        >
          <MenuItem value="" key="-1">
            None
          </MenuItem>
          {categories.map((x: Group, i: number) => (
            <MenuItem value={x.id} key={i}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel id="properties-select-outlined-label">
          Properties
        </InputLabel>
        <Select
          multiple
          labelId="properties-select-outlined-label"
          id="properties-select-outlined"
          value={state.properties}
          onChange={(e) => handleChangeSelect(e, 'properties')}
          label="Properties"
          disabled={loading || success}
        >
          {properties.map((x: Property, i: number) => (
            <MenuItem value={x.id} key={i}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
