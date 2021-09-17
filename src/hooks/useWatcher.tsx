import { useState, useEffect, DependencyList } from 'react';

interface IWatchFunction<T> {
  (callback: (result: T) => void): () => void;
}

export default function useWatcher<T>(watch: IWatchFunction<T>, deps: DependencyList) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const watcher = watch(result => setData(result));
    return () => watcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return data;
}
