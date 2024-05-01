import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Loads a string from storage.
 */
async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Saves a string to storage.
 */
async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)

    return true
  } catch {
    return false
  }
}

/**
 * Loads an object from storage.
 */
async function load<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key)

    return item ? (JSON.parse(item) as T) : null
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 */
async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes an item from storage.
 */
async function remove(key: string): Promise<void> {
  await AsyncStorage.removeItem(key)
}

/**
 * Clean all items from storage.
 */
async function clear(): Promise<void> {
  await AsyncStorage.clear()
}

export default {
  loadString,
  saveString,
  load,
  save,
  remove,
  clear,
}
