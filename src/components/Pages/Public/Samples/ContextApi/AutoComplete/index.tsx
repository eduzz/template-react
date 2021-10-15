import { useCallback, useState } from 'react';

import { CardContent, Divider } from '@mui/material';

import Button from '@eduzz/houston-ui/Button';

import RenderCounter from '../../RenderCounter';
import AutoCompleteContext from './context';
import Results from './Results';
import SearchField from './SearchField';

const AutoComplete = () => {
  const [search, setSearch] = useState('');
  const [counter, setCounter] = useState(0);
  const [outsideCounter, setOutsideCounter] = useState(0);

  const addCounter = useCallback(() => setCounter(counter => ++counter), []);
  const addOutsideCounter = useCallback(() => setOutsideCounter(counter => ++counter), []);

  return (
    <AutoCompleteContext.Provider value={{ search, counter, setSearch }}>
      <CardContent>
        <RenderCounter />
      </CardContent>

      <Divider />

      <CardContent>
        <SearchField />
      </CardContent>

      <Divider />

      <CardContent>
        <Results />
      </CardContent>

      <Divider />

      <CardContent>
        <Button onClick={addCounter}>Add Counter: {counter}</Button>&nbsp;
        <Button onClick={addOutsideCounter}>Add Outside: {outsideCounter}</Button>
      </CardContent>
    </AutoCompleteContext.Provider>
  );
};

export default AutoComplete;
