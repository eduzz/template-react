import { ChangeEvent, memo, useCallback, useState } from 'react';

import { IPaginationParams } from '@eduzz/houston-hooks/usePaginatedObservable';
import TextField from '@eduzz/houston-ui/Forms/Text';

interface IProps {
  paginationParams: IPaginationParams;
  onChange: (params: { term: string; page: number }) => void;
}

const SearchField = memo((props: IProps) => {
  const { paginationParams, onChange } = props;

  const [searchTerm, setSearchTerm] = useState(paginationParams.term ?? '');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value ?? '';
      setSearchTerm(value);

      if (value?.length > 2) {
        onChange({ term: value, page: 0 });
        return;
      }

      if (paginationParams.term) {
        onChange({ term: null, page: 0 });
      }
    },
    [onChange, paginationParams.term]
  );

  return (
    <TextField
      label='Pesquisar'
      name='search'
      value={searchTerm}
      onChange={handleChange}
      margin='none'
      fullWidth={false}
      placeholder='Digite ao menos 3 caracteres...'
    />
  );
});

export default SearchField;
