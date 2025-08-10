import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useLocalStorageWithExpiry(key, initialValue, ttl = 24 * 60 * 60 * 1000) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      const parsedItem = JSON.parse(item);
      const now = new Date();

      // Compare the expiry time of the item with the current time
      if (now.getTime() > parsedItem.expiry) {
        // If the item is expired, delete the item from storage and return null
        window.localStorage.removeItem(key);
        return initialValue;
      }

      return parsedItem.value;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        const now = new Date();
        const item = {
          value: valueToStore,
          expiry: now.getTime() + ttl,
        };
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useMultipleLocalStorage(keys, initialValues = {}) {
  const [values, setValues] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValues;
    }

    const storedValues = {};
    keys.forEach((key) => {
      try {
        const item = window.localStorage.getItem(key);
        storedValues[key] = item ? JSON.parse(item) : initialValues[key];
      } catch (error) {
        console.log(error);
        storedValues[key] = initialValues[key];
      }
    });
    return storedValues;
  });

  const setMultipleValues = (newValues) => {
    try {
      const updatedValues = { ...values, ...newValues };
      setValues(updatedValues);

      if (typeof window !== 'undefined') {
        Object.entries(newValues).forEach(([key, value]) => {
          window.localStorage.setItem(key, JSON.stringify(value));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setSingleValue = (key, value) => {
    try {
      const valueToStore = value instanceof Function ? value(values[key]) : value;
      const updatedValues = { ...values, [key]: valueToStore };
      setValues(updatedValues);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [values, setMultipleValues, setSingleValue];
}

export function clearLocalStorage(keys = []) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (keys.length === 0) {
      window.localStorage.clear();
    } else {
      keys.forEach((key) => {
        window.localStorage.removeItem(key);
      });
    }
  } catch (error) {
    console.log('Error clearing localStorage:', error);
  }
}

export function getLocalStorageSize() {
  if (typeof window === 'undefined') {
    return 0;
  }

  let total = 0;
  try {
    for (const key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        total += window.localStorage[key].length + key.length;
      }
    }
  } catch (error) {
    console.log('Error calculating localStorage size:', error);
  }
  
  return total;
}