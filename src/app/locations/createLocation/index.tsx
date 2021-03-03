import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Location } from 'data/model';
import classnames from 'classnames';
import { useLocations } from 'app/common/useData';
import { createLocationAsync, getLocationAsync } from 'data/actions';

import './createLocation.scss';

interface Props {
  id?: string;
}

export const CreateLocation: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const getLocations = useLocations({ needEffect: false });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Location>({
    id: '',
    displayName: '',
    latitude: 0,
    longitude: 0,
    state: '',
    county: '',
    country: '',
    defaultZoomLevel: 0,
    locationCode: '',
  });
  const [success, setSuccess] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Add location' : 'Edit location';
  }, [id]);

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

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof Location
    ) => {
      setState({ ...state, [field]: e.target.value });
    },
    [state]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createLocationAsync(state, () => {
        setLoading(false);
        setSuccess(true);
        getLocations();
      })
    );
  }, [dispatch, state, getLocations]);

  useEffect(() => {
    if (id != null) getLocation(id);
  }, [getLocation, id]);

  return (
    <Grid className="createLocation">
      <div className="title">{title}</div>
      <TextField
        id="outlined-name"
        label="Name"
        variant="outlined"
        size="small"
        value={state.displayName}
        onChange={(e) => handleChange(e, 'displayName')}
        disabled={loading || success}
      ></TextField>
      <TextField
        id="outlined-county"
        label="County"
        variant="outlined"
        size="small"
        value={state.county}
        onChange={(e) => handleChange(e, 'county')}
        disabled={loading || success}
      ></TextField>
      <TextField
        id="outlined-state"
        label="State"
        variant="outlined"
        size="small"
        value={state.state}
        onChange={(e) => handleChange(e, 'state')}
        disabled={loading || success}
      ></TextField>
      <TextField
        id="outlined-country"
        label="Country"
        variant="outlined"
        size="small"
        value={state.country}
        onChange={(e) => handleChange(e, 'country')}
        disabled={loading || success}
      ></TextField>
      <TextField
        id="outlined-locationCode"
        label="Location Code"
        variant="outlined"
        size="small"
        value={state.locationCode}
        onChange={(e) => handleChange(e, 'locationCode')}
        disabled={loading || success}
      ></TextField>
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
