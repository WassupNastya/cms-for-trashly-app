import { Button, LinearProgress, Link } from '@material-ui/core';
import { downloadAsync, uploadAsync } from 'data/actions';
import JSZip from 'jszip';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useExport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStorage, setIsLoadingStorage] = useState(false);

  const dispatch = useDispatch();

  const getData = useCallback(() => {
    setIsLoading(true);
    dispatch(
      downloadAsync((data) => {
        const zip = new JSZip();
        zip.file('decision_regions.json', JSON.stringify(data.locations));
        zip.file('items.json', JSON.stringify(data.items));
        zip.file('rules.json', JSON.stringify(data.rules));
        zip.file('decisions.json', JSON.stringify(data.decisions));

        if (data != null) {
          zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'trashly-db.zip';

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
        }
        setIsLoading(false);
      })
    );
  }, [dispatch]);

  const getDownloadButton = () => {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          You can download all files&nbsp;
          <Link
            component="button"
            variant="body1"
            color="secondary"
            onClick={getData}
            disabled={isLoading}
          >
            here
          </Link>
        </div>
        {isLoading && (
          <LinearProgress color="secondary" style={{ marginTop: '0.4rem' }} />
        )}
      </div>
    );
  };

  const uploadFiles = () => {
    setIsLoadingStorage(true);
    dispatch(uploadAsync(() => setIsLoadingStorage(false)));
  };

  const getUploadButton = () => {
    return (
      <div>
        <Button
          onClick={uploadFiles}
          color="secondary"
          style={{ marginTop: '0.5rem' }}
          disabled={isLoadingStorage}
        >
          Update storage files
        </Button>
        {isLoadingStorage && <LinearProgress color="secondary" />}
      </div>
    );
  };

  return { getDownloadButton, getUploadButton };
};
