import React from 'react';
import { SelectField } from 'shared/selectField';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const options = [
  'Usually',
  'If available',
  'For a fee',
  'Probably',
  'See details',
  'If applicable',
];

export const TypeSelect: React.FC<Props> = ({ value, onChange, disabled }) => {
  return (
    <div style={{ width: '48%' }}>
      <SelectField
        label="Type"
        options={options}
        value={value}
        getOptionLabel={(x) => x}
        onChange={onChange}
        disabled={disabled}
      ></SelectField>
    </div>
  );
};
