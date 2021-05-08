import React, { useCallback } from 'react';
import {
  checkCategoryAsync,
  checkGroupAsync,
  checkItemAsync,
  checkPropertyAsync,
} from 'data/actions';
import { Collection, Response } from 'data/enums';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import dependency from 'assets/dependency.svg';

export const useCheck = (collection: string) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const checkBeforeDelete = useCallback(
    (id: string, deleteAction: () => void) => {
      const onResponse = (response: string) => {
        if (response === Response.Ok) deleteAction();
        else
          enqueueSnackbar(
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={dependency}
                alt="Save."
                width="24"
                style={{ paddingBottom: '0.2rem' }}
              ></img>
              <span style={{ paddingLeft: '0.6rem', paddingRight: '1rem' }}>
                <b>Oops</b>, the element cannot be removed
                <br />
                It is being referenced by an item, rule or decision
              </span>
            </div>,
            {
              variant: 'info',
              autoHideDuration: 6000,
            }
          );
      };

      switch (collection) {
        case Collection.Groups: {
          dispatch(checkGroupAsync(id, onResponse));
          break;
        }
        case Collection.Categories: {
          dispatch(checkCategoryAsync(id, onResponse));
          break;
        }
        case Collection.Properties: {
          dispatch(checkPropertyAsync(id, onResponse));
          break;
        }
        case Collection.Items: {
          dispatch(checkItemAsync(id, onResponse));
          break;
        }
      }
    },
    [dispatch, collection, enqueueSnackbar]
  );

  return checkBeforeDelete;
};
