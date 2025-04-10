import * as React from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncesValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncesValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
