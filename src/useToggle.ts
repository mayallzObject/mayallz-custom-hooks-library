import { useState, useCallback } from 'react';

type HookReturnType = [
  boolean,
  (value?: boolean) => void,
  (value: boolean) => void
];

export const useToggle = (
  initialValue: boolean = false
): HookReturnType => {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = useCallback((value?: boolean) => {
    setValue((prev) => (typeof value === 'boolean' ? value : !prev));
  }, []);
  const set = useCallback((value: boolean) => {
    setValue(value);
  }, []);

  return [value, toggle, set];
};
