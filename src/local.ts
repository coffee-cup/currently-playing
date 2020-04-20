export type SerializeFn<T = any> = (data: T) => string;
export type DeserializeFn<T = any> = (item: string) => T;

const defaultSerializeFn: SerializeFn = JSON.stringify;
const defaultDeserializeFn: DeserializeFn = JSON.parse;

export const getItem = <T>(
  key: string,
  defaultValue: T,
  deserializeFn: DeserializeFn = defaultDeserializeFn,
): T => {
  try {
    const item = localStorage.getItem(key);

    if (item == null) {
      return defaultValue;
    }

    return deserializeFn(item);
  } catch (e) {
    return defaultValue;
  }
};

export const saveItem = <T>(
  key: string,
  value: T,
  serializeFn: SerializeFn = defaultSerializeFn,
) => {
  try {
    const item = serializeFn(value);
    localStorage.setItem(key, item);
  } catch (e) {}
};

export const clearItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
};
