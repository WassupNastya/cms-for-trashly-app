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
import { Category, Group, Rule, Item, Property } from 'data/model';
import classnames from 'classnames';
import {
  useCategories,
  useGroups,
  useItems,
  useRules,
} from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createRuleAsync } from 'data/actions';

import './createRule.scss';

interface Props {
  id?: string;
}

export const CreateRule: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getRules = useRules({ needEffect: false });

  useItems({ needEffect: true });
  useGroups({ needEffect: true });
  useCategories({ needEffect: true });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Rule>({
    id: '',
    location: '',
    description: '',
    properties: [],
  });
  const [success, setSuccess] = useState(false);

  const { items, groups, categories, properties } = useSelector(
    (state: StoreType) => state.data
  );

  const title = useMemo(() => {
    return id == null ? 'Add rule' : 'Edit rule';
  }, [id]);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof Rule
    ) => {
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const handleChangeSelect = useCallback(
    (e, field: keyof Rule) => {
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);

    const itemName: string | undefined = items.find(
      (x: Item) => x.id === state.item
    )?.name;

    const groupName: string | undefined = groups.find(
      (x: Group) => x.id === state.group
    )?.name;

    const categoryName: string | undefined = categories.find(
      (x: Category) => x.id === state.category
    )?.name;

    const propertiesName: string[] = properties.flatMap((x: Property) =>
      state.properties.includes(x.id) ? [x.name] : []
    );

    const newRule = { ...state };
    delete newRule.item;
    delete newRule.group;
    delete newRule.category;
    delete newRule.properties;

    if (itemName) newRule.item = itemName;
    if (groupName) newRule.group = groupName;
    if (categoryName) newRule.category = categoryName;
    newRule.properties = propertiesName;

    dispatch(
      createRuleAsync(newRule, () => {
        setLoading(false);
        setSuccess(true);
        getRules();
      })
    );
  }, [dispatch, state, categories, groups, getRules, items, properties]);

  return (
    <Grid className="createRule">
      <div className="title">{title}</div>
      <TextField
        multiline
        id="outlined-description"
        label="Description"
        variant="outlined"
        size="small"
        value={state.description}
        onChange={(e) => handleChange(e, 'description')}
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
