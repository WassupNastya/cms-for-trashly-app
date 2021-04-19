import React from 'react';
import { useItems } from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { Tab } from 'data/enums';
import { Item } from 'data/model';
import { useSelector } from 'react-redux';
import { SelectField } from 'shared/selectField';

interface Props {
  value: string; // name
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ItemSelect: React.FC<Props> = ({ value, onChange, disabled }) => {
  const items = useSelector((state: StoreType) => state.data.items);
  const getItems = useItems({ needEffect: false });

  return (
    <SelectField<string>
      label="Item"
      options={items.map((x: Item) => x.name)}
      getOptionLabel={(option: string) => option}
      value={value}
      onChange={onChange}
      disabled={disabled}
      helperText={Tab.Items}
      onClose={getItems}
      helperTextLabel="Create item"
      onChangeSubItem={onChange}
    />
  );
};
