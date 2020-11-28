import React from 'react';
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
}

export const Table: React.FC<Props> = ({ columns, rows }) => {
  return (
    <div className="table" style={{ height: '100%' }}>
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
