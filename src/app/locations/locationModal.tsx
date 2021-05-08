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
import { useDispatch } from 'react-redux';
import { Location } from 'data/model';
import { useLocations } from 'app/common/useData';
import { createLocationAsync, getLocationAsync } from 'data/actions';
import { Close } from '@material-ui/icons';
import { useSaveSnack } from 'app/common/useSaveSnack';
import { useForm } from 'react-hook-form';
import { ErrorString } from 'app/common/errorString/errorString';
import { useResponse } from 'app/common/useResponse';

interface Props {
  hide: () => void;
  id?: string;
}

export const LocationModal: React.FC<Props> = ({ id, hide }) => {
  const dispatch = useDispatch();
  const getLocations = useLocations({ needEffect: false });
  const showSaveSnack = useSaveSnack();
  const handleResponse = useResponse();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onBlur' });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Location>({
    id: '',
    name: '',
    latitude: 0,
    longitude: 0,
    state: '',
    county: '',
    country: '',
    defaultZoomLevel: 0,
    locationCode: '',
  });
  const [success, setSuccess] = useState(false);
  const [showDuplicateTooltip, setShowDuplicateTooltip] = useState(false);

  const title = useMemo(() => {
    return id == null ? 'Create' : 'Edit';
  }, [id]);

  const getLocation = useCallback(
    (id: string) => {
      dispatch(
        getLocationAsync(id, (response) => {
          setState(response);
          reset({ name: response.name });
        })
      );
    },
    [dispatch, reset]
  );

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof Location
    ) => {
      if (showDuplicateTooltip) setShowDuplicateTooltip(false);
      setState({ ...state, [field]: e.target.value });
      reset({ [field]: e.target.value });
    },
    [state, showDuplicateTooltip, reset]
  );

  const onSave = useCallback(() => {
    setLoading(true);
    dispatch(
      createLocationAsync(state, (response) => {
        setLoading(false);
        handleResponse(
          {
            onOk: () => {
              setSuccess(true);
              getLocations();
              showSaveSnack();
              hide();
            },
            onDuplicate: () => setShowDuplicateTooltip(true),
            onServerError: () => {
              console.log('Server error!');
            },
          },
          response
        );
      })
    );
  }, [dispatch, state, showSaveSnack, hide, getLocations, handleResponse]);

  useEffect(() => {
    if (id != null) getLocation(id);
  }, [getLocation, id]);

  return (
    <div style={{ width: '20rem' }}>
      <DialogTitle>
        <div>{id == null ? 'New Location' : 'Location'}</div>
        <Close onClick={hide} />
      </DialogTitle>
      <DialogContent>
        <Tooltip
          title={
            <span style={{ fontSize: '0.8rem' }}>
              Sorry, group with the same name
              <br />
              already exists 😞
            </span>
          }
          placement="right"
          arrow
          open={showDuplicateTooltip}
        >
          <TextField
            {...register('name', { required: true })}
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            value={state.name}
            onChange={(e) => handleChange(e, 'name')}
            disabled={loading || success}
            color="secondary"
            fullWidth
            margin="dense"
            error={errors.name != null}
          ></TextField>
        </Tooltip>
        <ErrorString
          isError={errors.name != null}
          errorMessage="Name is empty"
        />
        <TextField
          id="outlined-county"
          label="County"
          variant="outlined"
          size="small"
          value={state.county}
          onChange={(e) => handleChange(e, 'county')}
          disabled={loading || success}
          color="secondary"
          fullWidth
          margin="dense"
        ></TextField>
        <TextField
          id="outlined-state"
          label="State"
          variant="outlined"
          size="small"
          value={state.state}
          onChange={(e) => handleChange(e, 'state')}
          disabled={loading || success}
          color="secondary"
          fullWidth
          margin="dense"
        ></TextField>
        <TextField
          id="outlined-country"
          label="Country"
          variant="outlined"
          size="small"
          value={state.country}
          onChange={(e) => handleChange(e, 'country')}
          disabled={loading || success}
          color="secondary"
          fullWidth
          margin="dense"
        ></TextField>
        <TextField
          id="outlined-locationCode"
          label="Location Code"
          variant="outlined"
          size="small"
          value={state.locationCode}
          onChange={(e) => handleChange(e, 'locationCode')}
          disabled={loading || success}
          color="secondary"
          fullWidth
          margin="dense"
        ></TextField>
        <Button
          fullWidth
          onClick={handleSubmit(() => onSave())}
          disabled={loading || success}
        >
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
