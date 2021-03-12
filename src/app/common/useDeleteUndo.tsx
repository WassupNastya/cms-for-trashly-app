import { Button } from '@material-ui/core';
import {
  Category,
  Decision,
  Group,
  Item,
  Location,
  Property,
  Rule,
} from 'data/model';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import deleteLogo from 'assets/delete.svg';

export const useDeleteUndo = <
  T extends Item | Group | Category | Property | Rule | Decision | Location
>(
  list: T[]
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [rows, setRows] = useState<(T & { toBeDeleted: boolean })[]>([]);

  const rowsToDisplay = useMemo(() => {
    return rows.filter((x) => !x.toBeDeleted);
  }, [rows]);

  const action = useCallback(
    (id: string) => (
      <Button
        onClick={() => {
          // restore toBeDeletedItem
          const newRows = rows.flatMap((x: any) =>
            x.id === id ? [{ ...x, toBeDeleted: false }] : [x]
          );
          setRows(newRows);
          // hide snack
          closeSnackbar();
        }}
      >
        UNDO
      </Button>
    ),
    [rows, closeSnackbar]
  );

  const onDelete = useCallback(
    (
      key: string,
      onClose: (id: string) => void,
      getName: (el: T) => string
    ) => {
      const el: T = list.find((x) => x.id === key);
      if (el) {
        // remove from list
        const newRows = rows.flatMap((x) =>
          x.id === key ? [{ ...x, toBeDeleted: true }] : [x]
        );
        setRows(newRows);
        // show snack
        enqueueSnackbar(
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={deleteLogo}
              alt="Delete."
              style={{ paddingBottom: '0.2rem' }}
            ></img>
            <span style={{ paddingLeft: '0.6rem', paddingRight: '1rem' }}>
              <b>{getName(el)}</b> was deleted
            </span>
            <div
              style={{
                borderLeft: '1px solid white',
                marginLeft: 'auto',
                paddingLeft: '0.4rem',
              }}
            >
              {action(key)}
            </div>
          </div>,
          {
            variant: 'info',
            autoHideDuration: 5000,
            key,
            onClose: () => {
              dispatch(onClose(key));
            },
          }
        );
      }
    },
    [enqueueSnackbar, list, rows, action, dispatch]
  );

  useEffect(() => {
    const newRows = list.map((x: T) => ({ ...x, toBeDeleted: false }));
    setRows(newRows);
  }, [list]);

  return { rowsToDisplay, onDelete };
};
