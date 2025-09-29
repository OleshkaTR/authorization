import FormControl from '@mui/material/FormControl';
import { Control, FieldValues, useController, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  multiline?: boolean;
  maxRows?: number;
  minRows?: number;
}

export const TextInput = <TFieldValues extends FieldValues = FieldValues>({
  control,
  label,
  name,
  placeholder,
  multiline,
  maxRows,
  minRows,
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  });
  
  return (
    <FormControl fullWidth>
      <TextField
        size="small"
        label={label}
        InputLabelProps={{
          sx: { color: 'rgba(0, 0, 0, 0.25)' }
        }}
        {...field}
        multiline={multiline}
        maxRows={maxRows}
        minRows={minRows}
        placeholder={placeholder}
        error={Boolean(error)}
        aria-describedby={`stepper-linear-${name}`}
        onClickCapture={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        InputProps={{
          sx: {
            background: '#FFFFFF',
            borderRadius: '8px',
            paddingRight: 0,
            paddingLeft: 0,
            '.MuiInputBase-input': {
              paddingRight: '12px',
              paddingLeft: '12px'
            }
          }
        }}
      />

      {error && (
        <FormHelperText
          error={Boolean(error)}
          id={`stepper-linear-${name}`}
        >
          <span>{error?.message}</span>
        </FormHelperText>
      )}
    </FormControl>
  );
}
