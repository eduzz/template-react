import { useCallback, useState } from 'react';

import { CardContent, Divider } from '@mui/material';

import useObservable from '@eduzz/houston-hooks/useObservable';
import useObservableCallback from '@eduzz/houston-hooks/useObservableCallback';
import Button from '@eduzz/houston-ui/Button';

import RenderCounter from '../RenderCounter';
import Results from './Results';
import SearchField from './SearchField';
import autoCompleteService from './service';

const RxJs = () => {
  const [outsideCounter, setOutsideCounter] = useState(0);

  const [counter] = useObservable(() => autoCompleteService.getCounter(), []);

  const [addCounter] = useObservableCallback(() => autoCompleteService.addCounter(), []);
  const addOutsideCounter = useCallback(() => setOutsideCounter(counter => ++counter), []);

  return (
    <>
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
    </>
  );
};

export default RxJs;
