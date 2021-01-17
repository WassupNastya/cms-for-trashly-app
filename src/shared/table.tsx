import React from 'react';
import classnames from 'classnames';
import {
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table as BaseTable,
} from '@material-ui/core';

interface Props {
  columns: JSX.Element;
  rows: JSX.Element;
  className?: string;
}

export const Table: React.FC<Props> = ({ columns, rows, className }) => {
  return (
    <div className={classnames('table', className)} style={{ height: '100%' }}>
      <TableContainer style={{ height: '100%' }}>
        <BaseTable>
          <TableHead>
            <TableRow>{columns}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </BaseTable>
      </TableContainer>
    </div>
  );
};
