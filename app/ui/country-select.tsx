'use client';
import { Select, MenuItem, Stack, Typography } from '@mui/material';
import { Control, Path, FieldValues, useController } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'UA', name: 'Ukraine' },
];

type Props<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export default function CountrySelect<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
}: Props<TFieldValues>) {

  const {
    field: { onChange, value, onBlur },
    fieldState: { error, }
  } = useController({
    name,
    control
  });

  return (
    <Stack gap={0.5}>
      <Typography fontSize={14} fontWeight={600}>Country</Typography>

      <Select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        size='small'
        sx={{ background: '#FFFFFF', borderRadius: '8px' }}
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name}
          </MenuItem>
        ))}
      </Select>

      {!!error && (
        <FormHelperText
          error
          id={`select-input-${name}`}
        >
          <span>{error?.message}</span>
        </FormHelperText>
      )}
    </Stack> 
  );
};
