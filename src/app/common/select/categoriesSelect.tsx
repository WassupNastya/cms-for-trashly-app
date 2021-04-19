import React from 'react';
import { useCategories } from 'app/common/useData';
import { StoreType } from 'core/rootReducer';
import { Tab } from 'data/enums';
import { Category } from 'data/model';
import { useSelector } from 'react-redux';
import { SelectField } from 'shared/selectField';

interface Props {
  value: string[]; // names
  onChange: (value: string[]) => void;
  onChangeSubItem: (value: string) => void;
  disabled?: boolean;
}

export const CategoriesSelect: React.FC<Props> = ({
  value,
  onChange,
  onChangeSubItem,
  disabled,
}) => {
  const categories = useSelector((state: StoreType) => state.data.categories);
  const getCategories = useCategories({ needEffect: false });

  return (
    <SelectField<string>
      multiple
      label="Categories"
      options={categories.map((x: Category) => x.name)}
      getOptionLabel={(option: string) => option}
      value={value}
      onChange={onChange}
      disabled={disabled}
      helperText={Tab.Categories}
      onClose={getCategories}
      helperTextLabel="Create category"
      onChangeSubItem={onChangeSubItem}
    />
  );
};
