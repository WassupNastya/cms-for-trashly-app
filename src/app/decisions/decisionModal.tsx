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
import { CustomSlider } from 'shared/slider/slider';
import { convertDecisionToFirebase } from 'data/decision/converter';
import { ItemSelect } from 'app/common/select/itemSelect';
import { GroupSelect } from 'app/common/select/groupSelect';
import { CategorySelect } from 'app/common/select/categorySelect';
import { PropertiesSelect } from 'app/common/select/propertiesSelect';
import { useForm } from 'react-hook-form';
import { ErrorString } from 'app/common/errorString/errorString';

import { TypeSelect } from './components/typeSelect';

interface Props {
  hide: () => void;
  id?: string;
}

export const DecisionModal: React.FC<Props> = ({ id, hide }) => {
  const dispatch = useDispatch();
  const getDecisions = useDecisions({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onBlur' });

  useItems({ needEffect: true });
  useGroups({ needEffect: true });
  useCategories({ needEffect: true });
  useProperties({ needEffect: true });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Decision>({
    id: '',
    location: 'All',
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
      createDecisionAsync(
        convertDecisionToFirebase(state, items, groups, categories, properties),
        () => {
          setLoading(false);
          setSuccess(true);
          getDecisions();
          showSaveSnack();
          hide();
        }
      )
    );
  }, [
    dispatch,
    state,
    getDecisions,
    showSaveSnack,
    hide,
    items,
    groups,
    categories,
    properties,
  ]);

  const getDecision = useCallback(
    (id: string) => {
      dispatch(getDecisionAsync(id, (response) => setState(response)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id != null) getDecision(id);
  }, [id, getDecision]);

  const disabled = loading || success;

  return (
    <div style={{ width: '40rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Decision' : 'Decision'}</div>
        <Close onClick={hide} />
      </DialogTitle>
      <DialogContent>
        <TextField
          {...register('name', { required: true })}
          id="name"
          label="Name"
          variant="outlined"
          size="small"
          value={state.name}
          onChange={(e) => handleChange(e, 'name')}
          disabled={loading || success}
          fullWidth
          color="secondary"
          margin="dense"
          error={errors.name != null}
        ></TextField>
        <ErrorString
          isError={errors.name != null}
          errorMessage="Name is empty"
        />
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
        <ItemSelect
          value={state.item}
          onChange={(item) => setState({ ...state, item })}
          disabled={disabled}
        />
        <GroupSelect
          value={state.group}
          onChange={(group) => setState({ ...state, group })}
          disabled={disabled}
        />
        <CategorySelect
          value={state.category}
          onChange={(category) => setState({ ...state, category })}
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
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={handleSubmit(() => onSave())}
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
