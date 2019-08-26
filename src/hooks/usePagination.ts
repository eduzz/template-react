import { IPaginationParams } from 'interfaces/pagination';
import { DependencyList, useCallback, useState } from 'react';
import { useRetryableObservable } from 'react-use-observable';
import { Observable } from 'rxjs';

export default function usePaginationObservable<P extends IPaginationParams, T>(
  observableGenerator: (params: P) => Observable<T>,
  initialParams: Partial<P>,
  deps: DependencyList
) {
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

  const result = useRetryableObservable(() => {
    return observableGenerator(params);
  }, [params, ...deps]);

  return [params, mergeParams, ...result] as [
    typeof params,
    typeof mergeParams,
    T | undefined,
    any,
    boolean,
    () => void
  ];
}
