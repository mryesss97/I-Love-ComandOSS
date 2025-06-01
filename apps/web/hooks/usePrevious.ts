import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  // @ts-ignore
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
