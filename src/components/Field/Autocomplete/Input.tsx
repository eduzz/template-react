import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input(props: any) {
  const { classes, ref, endAdornment, submitted, touched, error, ...other } = props;

  return (
    <TextField
      fullWidth
      {...{
        fullWidth: true,
        margin: 'normal',
        ...other,
        error: (submitted || touched) && !!error,
        helperText: (submitted || touched) && error,
        submitted: null,
        touched: null
      }}
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        endAdornment
      }}
    />
  );
}