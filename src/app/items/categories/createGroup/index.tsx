import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Category } from 'data/model';
import { createCategoryAsync, getCategoryAsync } from 'data/actions';
import classnames from 'classnames';
import { useCategories } from 'app/common/useData';

import './createCategory.scss';

interface Props {
  id?: string;
}

export const CreateCategory: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getCategories = useCategories({ needEffect: false });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Category>({
    name: '',
    id: '',
  });
  const [success, setSuccess] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Add category' : 'Edit category';
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
      })
    );
  }, [dispatch, state, getCategories]);

  useEffect(() => {
    if (id != null) getCategory(id);
  }, [getCategory, id]);

  return (
    <Grid className="createCategory">
      <div className="title">{title}</div>
      <TextField
        id="outlined-name"
        label="Name"
        variant="outlined"
        size="small"
        value={state.name}
        onChange={handleChange}
        disabled={loading || success}
      />
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
