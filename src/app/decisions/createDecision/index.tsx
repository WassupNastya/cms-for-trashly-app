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
import { Category, Group, Item, Decision, Property } from 'data/model';
import classnames from 'classnames';
import { useDecisions } from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createDecisionAsync, getDecisionAsync } from 'data/actions';

import './createDecision.scss';

interface Props {
  id?: string;
}

export const CreateDecision: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getDecisions = useDecisions({ needEffect: false });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Decision>({
    id: '',
    location: '',
    description: '',
    priority: '',
    name: '',
    decisionNameType: '',
    properties: [],
    group: '',
    category: '',
    item: '',
  });
  const [success, setSuccess] = useState(false);

  const { items, groups, categories, properties } = useSelector(
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

    const newDecision = { ...state };
    delete newDecision.item;
    delete newDecision.group;
    delete newDecision.category;
    delete newDecision.properties;

    if (itemName) newDecision.item = itemName;
    if (groupName) newDecision.group = groupName;
    if (categoryName) newDecision.category = categoryName;
    newDecision.properties = propertiesName;

    dispatch(
      createDecisionAsync(newDecision, () => {
        setLoading(false);
        setSuccess(true);
        getDecisions();
      })
    );
  }, [dispatch, state, categories, groups, getDecisions, items, properties]);

  const getDecision = useCallback(
    (id: string) => {
      dispatch(getDecisionAsync(id, (response) => setState(response)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id != null) getDecision(id);
  }, [id, getDecision]);

  return (
    <Grid className="createDecision">
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
        id="outlined-decisionNameType"
        label="Type"
        variant="outlined"
        size="small"
        value={state.decisionNameType}
        onChange={(e) => handleChange(e, 'decisionNameType')}
        disabled={loading || success}
      ></TextField>
      <TextField
        id="outlined-priority"
        label="Priority"
        variant="outlined"
        size="small"
        value={state.priority}
        onChange={(e) => handleChange(e, 'priority')}
        disabled={loading || success}
      ></TextField>
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
          <MenuItem value="" key="-1">
            None
          </MenuItem>
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
          value={state.category}
          onChange={(e) => handleChangeSelect(e, 'category')}
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
