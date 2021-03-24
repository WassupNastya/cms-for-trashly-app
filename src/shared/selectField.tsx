import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Checkbox, Chip, Radio, TextField } from '@material-ui/core';
import { useCreateDialog } from 'app/common/useCreateDialog';
import {
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
} from '@material-ui/icons';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const radio = <RadioButtonUncheckedOutlined fontSize="small" />;
const radioChecked = <RadioButtonCheckedOutlined fontSize="small" />;

interface Props<T> {
  label: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  onChange: (value: string | string[]) => void;
  value?: string | string[];
  multiple?: boolean;
  disabled?: boolean;
  helperText?: string;
  onClose?: () => void;
  helperTextLabel?: string;
  onChangeSubItem?: (name: string) => void;
  style?: React.CSSProperties;
}

export const SelectField: <T>(props: Props<T>) => JSX.Element = <T,>({
  label,
  options,
  getOptionLabel,
  value,
  onChange,
  multiple,
  disabled,
  helperText,
  helperTextLabel,
  onChangeSubItem,
  style,
}: Props<T>): JSX.Element => {
  const { show, dialog } = useCreateDialog();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Autocomplete
        disabled={disabled}
        multiple={multiple}
        fullWidth
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            color="secondary"
            margin="dense"
          />
        )}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionSelected={(option, value) => option === value}
        value={value}
        disableCloseOnSelect={multiple}
        onChange={(_, value) => onChange(value as string)}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            {!multiple ? (
              <Radio
                icon={radio}
                checkedIcon={radioChecked}
                style={{ marginRight: 4 }}
                checked={selected}
              />
            ) : (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 4 }}
                checked={selected}
              />
            )}
            {getOptionLabel(option)}
          </React.Fragment>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        style={style}
      />
      {helperText && (
        <div
          className="formHelperText"
          onClick={() => show(undefined, helperText, onChangeSubItem)}
        >
          {helperTextLabel ?? ''}
        </div>
      )}
      {dialog}
    </div>
  );
};
