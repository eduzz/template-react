import * as coreOperators from 'rxjs/operators';

import { bindComponent } from './bindComponent';
import { cache } from './cache';
import { cacheClean } from './cacheClean';
import { loader } from './loader';
import { logError } from './logError';
import { tapSubscribe } from './tapSubscrible';

export * from 'rxjs/operators';
export * from './bindComponent';
export * from './cache';
export * from './loader';
export * from './logError';

const RxOp = {
  ...coreOperators,
  bindComponent,
  cache,
  cacheClean,
  loader,
  logError,
  tapSubscribe
};

export default RxOp;