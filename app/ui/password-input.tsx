'use client'

import { useState } from 'react';
import { Control, FieldValues, useController, Path } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
}

export const PasswordInput = <TFieldValues extends FieldValues = FieldValues>({
  control,
  label,
  name,
  placeholder
}: Props<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

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
        type={showPassword ? 'text' : 'password'}
        InputLabelProps={{
          sx: { color: 'rgba(0, 0, 0, 0.25)' }
        }}
        {...field}
        placeholder={placeholder}
        error={Boolean(error)}
        aria-describedby={`stepper-linear-${name}`}
        onClickCapture={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onMouseDown={toggleShowPassword}
              >
                {showPassword ? <VisibilityOutlinedIcon sx={{ fontSize: '16px'}} /> : <VisibilityOffOutlinedIcon sx={{ fontSize: '16px'}} />}
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            background: '#FFFFFF',
            borderRadius: '8px',
            paddingRight: '12px',
            '& input[type=password]::-ms-reveal': {
              display: 'none'
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
