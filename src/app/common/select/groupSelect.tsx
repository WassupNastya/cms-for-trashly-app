import React from 'react';
import { useGroups } from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { Tab } from 'data/enums';
import { Group } from 'data/model';
import { useSelector } from 'react-redux';
import { SelectField } from 'shared/selectField';

interface Props {
  value: string; // name
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const GroupSelect: React.FC<Props> = ({ value, onChange, disabled }) => {
  const groups = useSelector((state: StoreType) => state.data.groups);
  const getGroups = useGroups({ needEffect: false });

  return (
    <SelectField<string>
      label="Group"
      options={groups.map((x: Group) => x.name)}
      getOptionLabel={(option: string) => option}
      value={value}
      onChange={onChange}
      disabled={disabled}
      helperText={Tab.Groups}
      onClose={getGroups}
      helperTextLabel="Create group"
      onChangeSubItem={onChange}
    />
  );
};
