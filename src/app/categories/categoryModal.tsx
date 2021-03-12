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
import { useDispatch } from 'react-redux';
import { Category } from 'data/model';
import { createCategoryAsync, getCategoryAsync } from 'data/actions';
import { useCategories } from 'app/common/useData';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';

interface Props {
  hide: () => void;
  id?: string;
  onChangeSubItem?: (name: string) => void;
}

export const CategoryModal: React.FC<Props> = ({ id, hide, onChangeSubItem }) => {
  const dispatch = useDispatch();
  const getCategories = useCategories({ needEffect: false });
  const showSaveSnack = useSaveSnack();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Category>({
    name: '',
    id: '',
  });
  const [success, setSuccess] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Create' : 'Rename';
  }, [id]);

  const getCategory = useCallback(
    (id: string) => {
      dispatch(getCategoryAsync(id, (model) => setState(model)));
    },
    [dispatch]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState({ ...state, name: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createCategoryAsync(state, () => {
        setLoading(false);
        setSuccess(true);
        getCategories();
        showSaveSnack();
        onChangeSubItem?.(state.name);
        hide();
      })
    );
  }, [dispatch, state, getCategories, showSaveSnack, hide, onChangeSubItem]);

  useEffect(() => {
    if (id != null) getCategory(id);
  }, [getCategory, id]);

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Category' : 'Category'}</div>
        <Close onClick={hide} />
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="outlined-name"
          label="Name"
          variant="outlined"
          value={state.name}
          onChange={handleChange}
          disabled={loading || success}
          size="small"
          color="secondary"
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
