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
import { Rule } from 'data/model';
import {
  useCategories,
  useGroups,
  useItems,
  useProperties,
  useRules,
} from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createRuleAsync, getRuleAsync } from 'data/actions';
import { Close, InfoOutlined } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { SelectField } from 'shared/selectField';
import { Tab } from 'data/enums';

interface Props {
  hide: () => void;
  id?: string;
}

export const RuleModal: React.FC<Props> = ({ id, hide }) => {
  const dispatch = useDispatch();
  const getRules = useRules({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const getItems = useItems({ needEffect: true });
  const getGroups = useGroups({ needEffect: true });
  const getCategories = useCategories({ needEffect: true });
  const getProperties = useProperties({ needEffect: true });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Rule>({
    id: '',
    name: '',
    location: '',
    description: '',
    properties: [],
    category: '',
    group: '',
    item: '',
  });
  const [success, setSuccess] = useState(false);

  const { items, groups, categories, properties } = useSelector(
    (state: StoreType) => state.data
  );

  const title = useMemo(() => {
    return id == null ? 'Create' : 'Edit';
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

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createRuleAsync({ ...state }, () => {
        setLoading(false);
        setSuccess(true);
        getRules();
        showSaveSnack();
        hide();
      })
    );
  }, [dispatch, state, getRules, showSaveSnack, hide]);

  const getRule = useCallback(
    (id: string) => {
      dispatch(getRuleAsync(id, (response) => setState(response)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id != null) getRule(id);
  }, [id, getRule]);

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Rule' : 'Rule'}</div>
        <Close onClick={hide} />
      </DialogTitle>
      <DialogContent>
        <TextField
          multiline
          id="outlined-name"
          label="Name"
          variant="outlined"
          size="small"
          value={state.name}
          onChange={(e) => handleChange(e, 'name')}
          disabled={loading || success}
          color="secondary"
          fullWidth
          margin="dense"
          InputProps={{
            endAdornment: (
              <Tooltip title="e.g. Recycle or Landfill Bin" arrow placement="top">
                <InfoOutlined style={{ color: '#A9A9A9' }} fontSize="small" />
              </Tooltip>
            ),
          }}
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
          color="secondary"
          fullWidth
          margin="dense"
        ></TextField>
        <SelectField<string>
          label="Item"
          options={items.map((x) => x.name)}
          getOptionLabel={(option: string) => option}
          value={state.item}
          onChange={(item) => setState({ ...state, item: item as string })}
          disabled={loading || success}
          helperText={Tab.Items}
          onClose={getItems}
          helperTextLabel="Create item"
          onChangeSubItem={(item) =>
            setState({ ...state, item: item as string })
          }
        />
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
          label="Category"
          options={categories.map((x) => x.name)}
          getOptionLabel={(option: string) => option}
          value={state.category}
          onChange={(category) =>
            setState({ ...state, category: category as string })
          }
          disabled={loading || success}
          helperText={Tab.Categories}
          onClose={getCategories}
          helperTextLabel="Create category"
          onChangeSubItem={(category) =>
            setState({ ...state, category: category as string })
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
