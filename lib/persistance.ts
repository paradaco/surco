import { MMKV, useMMKVNumber, useMMKVString } from "react-native-mmkv";
import SuperJSON from "superjson";
import { StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Partition = "buildings" | "connections";

export const storage = new MMKV({
  id: "surcoStorage",
});

export const usePersistNumber = (key: string) => useMMKVNumber(key, storage);
export const usePersistString = (key: string) => useMMKVString(key, storage);

export const getPersistedNumber = (key: string) => storage.getNumber(key);
export const getPersistedString = (key: string) => storage.getString(key);

export const persistZustand = <T>(name: Partition, actions: StateCreator<T>) =>
  persist(actions, {
    storage: createJSONStorage(() => ({
      setItem: (name, value) => storage.set(name, SuperJSON.stringify(value)),
      getItem: (name) => (storage.getString(name) ? SuperJSON.parse(storage.getString(name)!) : null),
      removeItem: (name) => storage.delete(name),
    })),
    name,
  });
