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
import { Category, Group, Item } from 'data/model';
import classnames from 'classnames';
import { useCategories, useGroups, useItems } from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createItemAsync } from 'data/actions';

import './createItem.scss';

interface Props {
  id?: string;
}

export const CreateItem: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getItems = useItems({ needEffect: false });
  
  useGroups({ needEffect: true });
  useCategories({ needEffect: true });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Item>({
    name: '',
    id: '',
    group: '',
    category: '',
    properties: [],
  });
  const [success, setSuccess] = useState(false);

  const { groups, categories } = useSelector((state: StoreType) => state.data);

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
    const category: Category | undefined = categories.find(
      (x: Category) => x.id === state.category
    );

    dispatch(
      createItemAsync(
        {
          ...state,
          group: group?.name ?? '',
          category: category?.name ?? '',
        },
        () => {
          setLoading(false);
          setSuccess(true);
          getItems();
        }
      )
    );
  }, [dispatch, state, categories, groups, getItems]);

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
      <FormControl variant="outlined">
        <InputLabel id="group-select-outlined-label">Group</InputLabel>
        <Select
          labelId="group-select-outlined-label"
          id="group-select-outlined"
          value={state.group}
          onChange={(e) => handleChangeSelect(e, 'group')}
          label="Group"
        >
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
          value={state.category}
          onChange={(e) => handleChangeSelect(e, 'category')}
          label="Category"
        >
          {categories.map((x: Group, i: number) => (
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
