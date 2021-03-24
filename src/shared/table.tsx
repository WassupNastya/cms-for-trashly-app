import React from 'react';
import classnames from 'classnames';
import { ColDef, DataGrid } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core';

import './table.scss';

interface Props {
  columns: ColDef[];
  rows: any;
  className?: string;
  loading?: boolean;
}

export const Table: React.FC<Props> = ({
  columns,
  rows,
  className,
  loading,
}) => {
  return (
    <Grid className={classnames('table', className)}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        loading={loading}
        disableColumnMenu
      />
    </Grid>
  );
};
