import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: could not read key "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: could not write key "${key}"`, error);
    }
  }, [key, storedValue]);

  const setValue = (value) => {
    setStoredValue((prev) =>
      typeof value === 'function' ? value(prev) : value
    );
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
