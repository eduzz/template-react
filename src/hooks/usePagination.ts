import { IPaginationParams } from 'interfaces/pagination';
import { DependencyList, useCallback, useState } from 'react';
import { useRetryableObservable } from 'react-use-observable';
import { Observable, of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

export default function usePaginationObservable<P extends IPaginationParams, T>(
  observableGenerator: (params: P) => Observable<T>,
  initialParams: Partial<P>,
  deps: DependencyList
) {
  const [lastResult, setLastResult] = useState<T>(undefined);
  const [params, setParams] = useState<P>({
    orderDirection: 'asc',
    pageSize: 10,
    page: 0,
    ...initialParams
  } as P);

  const mergeParams = useCallback(
    (newParams: Partial<P>) => {
      setParams({ ...params, ...newParams });
    },
    [params]
  );

  const [data, error, completed, retry] = useRetryableObservable(() => {
    return of(true).pipe(
      delay(500),
      tap(() => console.log('here')),
      switchMap(() => observableGenerator(params)),
      tap(
        data => setLastResult(data),
        () => setLastResult(undefined)
      )
    );
  }, [params, ...deps]);

  return [
    params,
    mergeParams,
    data === undefined && error === undefined,
    data || lastResult,
    error,
    completed,
    retry
  ] as [typeof params, typeof mergeParams, boolean, T | undefined, typeof error, typeof completed, typeof retry];
}
