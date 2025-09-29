import { ReactElement } from 'react';
import { Control, Path, FieldValues, useController } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  label: ReactElement;
  name: Path<TFieldValues>;
}

export default function CheckboxInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  label,
  name,
}: Props<TFieldValues>) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <FormControl sx={{ width: 'fit-content' }}>
      <FormControlLabel
        sx={{
          width: '100%',
          marginRight: 0,
          '.MuiButtonBase-root': {
            paddingTop: 0
          }
        }}
        control={<Checkbox {...field} checked={field.value} size='small' />}
        label={label}
      />

      {error && (
        <FormHelperText
          sx={{ color: 'error.main' }}
          error
          id={`checkbox-${name}`}
        >
          {error?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
