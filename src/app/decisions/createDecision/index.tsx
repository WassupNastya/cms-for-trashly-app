import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
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
import { Category, Group, Item, Decision } from 'data/model';
import classnames from 'classnames';
import {
  useCategories,
  useDecisions,
  useGroups,
  useItems,
} from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createDecisionAsync } from 'data/actions';

import './createDecision.scss';

interface Props {
  id?: string;
}

export const CreateDecision: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getDecisions = useDecisions({ needEffect: false });

  useItems({ needEffect: true });
  useGroups({ needEffect: true });
  useCategories({ needEffect: true });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Decision>({
    id: '',
    location: '',
    description: '',
    priority: '',
    name: '',
    decisionNameType: '',
  });
  const [success, setSuccess] = useState(false);

  const { items, groups, categories } = useSelector(
    (state: StoreType) => state.data
  );

  const title = useMemo(() => {
    return id == null ? 'Add decision' : 'Edit decision';
  }, [id]);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof Decision
    ) => {
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const handleChangeSelect = useCallback(
    (e, field: keyof Decision) => {
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
      createDecisionAsync(
        {
          ...state,
          group: group?.name ?? '',
          category: category?.name ?? '',
        },
        () => {
          setLoading(false);
          setSuccess(true);
          getDecisions();
        }
      )
    );
  }, [dispatch, state, categories, groups, getDecisions]);

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
        <InputLabel id="group-select-outlined-label">Item</InputLabel>
        <Select
          labelId="item-select-outlined-label"
          id="item-select-outlined"
          value={state.item}
          onChange={(e) => handleChangeSelect(e, 'item')}
          label="Item"
          disabled={loading || success}
        >
          {items.map((x: Item, i: number) => (
            <MenuItem value={x.id} key={i}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
          disabled={loading || success}
        >
          {categories.map((x: Group, i: number) => (
            <MenuItem value={x.id} key={i}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="outlined-description"
        label="Description"
        variant="outlined"
        size="small"
        value={state.description}
        onChange={(e) => handleChange(e, 'description')}
        disabled={loading || success}
      ></TextField>
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
