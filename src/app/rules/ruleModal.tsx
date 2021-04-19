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
import { useRules } from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { createRuleAsync, getRuleAsync } from 'data/actions';
import { Close, InfoOutlined } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { ItemSelect } from 'app/common/select/itemSelect';
import { GroupSelect } from 'app/common/select/groupSelect';
import { PropertiesSelect } from 'app/common/select/propertiesSelect';
import { convertRuleToFirebase } from 'data/rule/converter';
import { CategorySelect } from 'app/common/select/categorySelect';

interface Props {
  hide: () => void;
  id?: string;
}

export const RuleModal: React.FC<Props> = ({ id, hide }) => {
  const dispatch = useDispatch();
  const getRules = useRules({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Rule>({
    id: '',
    name: '',
    location: 'All',
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
      createRuleAsync(
        convertRuleToFirebase(state, items, groups, categories, properties),
        () => {
          setLoading(false);
          setSuccess(true);
          getRules();
          showSaveSnack();
          hide();
        }
      )
    );
  }, [
    dispatch,
    state,
    getRules,
    showSaveSnack,
    hide,
    items,
    groups,
    categories,
    properties,
  ]);

  const getRule = useCallback(
    (id: string) => {
      dispatch(getRuleAsync(id, (response) => setState(response)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id != null) getRule(id);
  }, [id, getRule]);

  const disabled = loading || success;

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
              <Tooltip
                title="e.g. Recycle or Landfill Bin"
                arrow
                placement="top"
              >
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
