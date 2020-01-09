import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { IPaginationParams } from 'interfaces/pagination';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import React, { memo, useCallback, useMemo, useRef } from 'react';

interface IProps {
  paginationParams: IPaginationParams;
  onChange: (params: { term: string; page: number }) => void;
}

const useStyle = makeStyles({
  iconButton: {
    marginRight: -15
  }
});

const SearchField = memo((props: IProps) => {
  const { paginationParams, onChange } = props;

  const classes = useStyle(props);

  const inputLabelProps = useRef({ shrink: true }).current;
  const inputProps = useMemo(() => {
    return {
      endAdornment: (
        <InputAdornment position='end'>
          <IconButton disabled={true} className={classes.iconButton}>
            <MagnifyIcon />
          </IconButton>
        </InputAdornment>
      )
    };
  }, [classes.iconButton]);

  const handleChange = useCallback((term: string) => onChange({ term, page: 0 }), [onChange]);

  return (
    <FieldText
      label='Pesquisar'
      value={paginationParams.term}
      onChange={handleChange}
      margin='none'
      placeholder='Digite ao menos 3 caracteres...'
      InputLabelProps={inputLabelProps}
      InputProps={inputProps}
    />
  );
});

export default SearchField;
