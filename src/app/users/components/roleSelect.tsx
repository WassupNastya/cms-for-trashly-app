import React from 'react';
import { SelectField } from 'shared/selectField';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const options = ['Viewer', 'Editor', 'Administrator'];

export const RoleSelect: React.FC<Props> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <SelectField
        label="Role"
        options={options}
        value={value}
        getOptionLabel={(x) => x}
        onChange={onChange}
        disabled={disabled}
        disableClearable
      ></SelectField>
    </div>
  );
};
