import * as coreOperators from 'rxjs/operators';

import { bindComponent } from './bindComponent';
import { cache } from './cache';
import { loader } from './loader';
import { logError } from './logError';

export * from 'rxjs/operators';
export * from './bindComponent';
export * from './cache';
export * from './loader';
export * from './logError';

const RxOp = {
  ...coreOperators,
  bindComponent,
  cache,
  loader,
  logError
};

export default RxOp;