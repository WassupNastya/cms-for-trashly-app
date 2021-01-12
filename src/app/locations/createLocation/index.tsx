import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { Page } from 'shared/page';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getLocationAsync } from 'data/actions';
import { Location } from 'data/model';
import { useSnackbar } from 'notistack';

import './createLocation.scss';

export const CreateLocation: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams<{ id?: string }>();
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState<Location>({
    country: '',
    county: '',
    state: '',
    id: '',
    displayName: '',
    latitude: 0,
    longitude: 0,
    defaultZoomLevel: 0,
    locationCode: '',
  });
  const [showDialog, setShowDialog] = useState(false);

  const title = useMemo(() => {
    return location.pathname.includes('/add')
      ? 'Add location'
      : 'Edit location';
  }, [location.pathname]);

  const getLocation = useCallback(
    (id: string) => {
      dispatch(
        getLocationAsync(id, (response) => {
          setState(response);
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (params.id) getLocation(params.id);
  }, [getLocation, params.id]);

  return (
    <>
      <Page title={title} needPanel={false}>
        <Grid className="CreateLocation">
          <div className="Buttons">
            <Button variant="contained" onClick={() => setShowDialog(true)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              className="Save"
              onClick={() =>
                enqueueSnackbar('Location is saved successfully!', {
                  variant: 'success',
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  persist: false,
                })
              }
            >
              Save
            </Button>
          </div>
          <Grid item xs={12} sm={4}>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-county"
                label="County"
                variant="outlined"
                size="small"
                value={state.county}
                onChange={(e) =>
                  setState((prevState) =>
                    prevState
                      ? { ...prevState, county: e.target.value }
                      : prevState
                  )
                }
              />
              <TextField
                id="outlined-country"
                label="Country"
                variant="outlined"
                size="small"
                value={state.country}
                onChange={(e) =>
                  setState((prevState) =>
                    prevState
                      ? { ...prevState, country: e.target.value }
                      : prevState
                  )
                }
              />
              <TextField
                id="outlined-state"
                label="State"
                variant="outlined"
                size="small"
                value={state.state}
                onChange={(e) =>
                  setState((prevState) =>
                    prevState
                      ? { ...prevState, state: e.target.value }
                      : prevState
                  )
                }
              />
            </form>
          </Grid>
        </Grid>
      </Page>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You currently have unsaved changes!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowDialog(false);
              history.goBack();
            }}
            color="primary"
          >
            Discard changes and leave
          </Button>
          <Button
            onClick={() => setShowDialog(false)}
            color="primary"
            autoFocus
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
