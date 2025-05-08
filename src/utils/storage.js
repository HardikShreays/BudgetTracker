// Load data from localStorage
export const loadFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return undefined;
  }
};

// Save data to localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Clear all data from localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Remove specific key from localStorage
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};