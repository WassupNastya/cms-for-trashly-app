import React from 'react';
import { useProperties } from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { Tab } from 'data/enums';
import { Property } from 'data/model';
import { useSelector } from 'react-redux';
import { SelectField } from 'shared/selectField';

interface Props {
  value: string[]; // names
  onChange: (value: string[]) => void;
  onChangeSubItem: (value: string) => void;
  disabled?: boolean;
}

export const PropertiesSelect: React.FC<Props> = ({
  value,
  onChange,
  onChangeSubItem,
  disabled,
}) => {
  const properties = useSelector((state: StoreType) => state.data.properties);
  const getProperties = useProperties({ needEffect: false });

  return (
    <SelectField<string>
      multiple
      label="Properties"
      options={properties.map((x: Property) => x.name)}
      getOptionLabel={(option: string) => option}
      value={value}
      onChange={onChange}
      disabled={disabled}
      helperText={Tab.Properties}
      onClose={getProperties}
      helperTextLabel="Create property"
      onChangeSubItem={onChangeSubItem}
    />
  );
};
