'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { FormHelperText, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export default function CustomDatePicker<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
}: Props<TFieldValues>) {
  const {
    field: { value, onChange },
    fieldState: { error, }
  } = useController({
    name,
    control
  });

  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (value) {
      setDate(dayjs(value, "MM.DD.YYYY"));
    }
  }, [value]);

  const handleChange = (newValue: PickerValue) => {
    setDate(newValue);

    if (newValue) {
      const formatted = newValue.format('MM.DD.YYYY');
      onChange(formatted);
    }
  }

  return (
    <Stack gap={0.5}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={handleChange}
          format="MM.DD.YYYY"
          slots={{
            openPickerIcon: CalendarMonthIcon
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              InputProps: {
                sx: {
                  height: 40,
                  '& input': {
                    padding: '8px 12px'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 18
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
  
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
}