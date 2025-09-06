import { MMKV, useMMKVNumber, useMMKVObject, useMMKVString } from "react-native-mmkv";
import SuperJSON from "superjson";
import { StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Partition = `id-${string}-level-${1 | 2 | 3}` | "currentTick" | "firstTick";

export const storage = new MMKV({
  id: "surcoStorage",
});

export const usePersistNumber = (key: Partition) => useMMKVNumber(key, storage);
export const usePersistString = (key: Partition) => useMMKVString(key, storage);
export const usePersistObject = (key: Partition) => useMMKVObject(key, storage);

export const getPersistedNumber = (key: Partition) => storage.getNumber(key);
export const getPersistedString = (key: Partition) => storage.getString(key);
export const getPersistedObject = (key: Partition) => storage.getString(key);

export const persistZustand = <T>(name: Partition, actions: StateCreator<T>) =>
  persist(actions, {
    storage: createJSONStorage(() => ({
      setItem: (name, value) => storage.set(name, SuperJSON.stringify(value)),
      getItem: (name) => (storage.getString(name) ? SuperJSON.parse(storage.getString(name)!) : null),
      removeItem: (name) => storage.delete(name),
    })),
    name,
  });
