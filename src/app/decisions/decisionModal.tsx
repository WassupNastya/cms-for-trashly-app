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
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Decision } from 'data/model';
import {
  useCategories,
  useDecisions,
  useGroups,
  useItems,
  useProperties,
} from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createDecisionAsync, getDecisionAsync } from 'data/actions';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { Tab } from 'data/enums';
import { SelectField } from 'shared/selectField';
import { CustomSlider } from 'shared/slider/slider';

import { TypeSelect } from './components/typeSelect';

interface Props {
  hide: () => void;
  id?: string;
}

export const DecisionModal: React.FC<Props> = ({ id, hide }) => {
  const dispatch = useDispatch();
  const getDecisions = useDecisions({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const getItems = useItems({ needEffect: true });
  const getGroups = useGroups({ needEffect: true });
  const getCategories = useCategories({ needEffect: true });
  const getProperties = useProperties({ needEffect: true });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Decision>({
    id: '',
    location: '',
    description: '',
    priority: 'Low',
    name: '',
    decisionNameType: '',
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
      field: keyof Decision
    ) => {
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createDecisionAsync({ ...state }, () => {
        setLoading(false);
        setSuccess(true);
        getDecisions();
        showSaveSnack();
        hide();
      })
    );
  }, [dispatch, state, getDecisions, showSaveSnack, hide]);

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
    <div style={{ width: '40rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Decision' : 'Decision'}</div>
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
          fullWidth
          color="secondary"
          margin="dense"
        ></TextField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TypeSelect
            value={state.decisionNameType}
            onChange={(decisionNameType) =>
              setState({ ...state, decisionNameType })
            }
            disabled={loading || success}
          />
          <CustomSlider
            value={state.priority}
            onChange={(priority) => setState({ ...state, priority })}
            disabled={loading || success}
          />
        </div>
        <TextField
          multiline
          id="outlined-description"
          label="Description"
          variant="outlined"
          size="small"
          value={state.description}
          onChange={(e) => handleChange(e, 'description')}
          disabled={loading || success}
          fullWidth
          color="secondary"
          margin="dense"
          style={{ marginBottom: '1rem' }}
        ></TextField>
        {id == null && (
          <Typography variant="body2">
            You can add something now or do it later
          </Typography>
        )}
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
        <div
          style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
        >
          <Button
            onClick={onSave}
            disabled={loading || success}
            style={{
              margin: 'unset',
              marginTop: '2rem',
              marginBottom: '1rem',
              width: '8rem',
            }}
          >
            {loading && (
              <CircularProgress
                style={{ position: 'absolute', color: 'white' }}
                size={24}
              />
            )}
            {title}
          </Button>
        </div>
      </DialogContent>
    </div>
  );
};
