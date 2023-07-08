import { create } from 'zustand';
import queryKeys from 'consts/queryKeys';

type AllQueryKeys = keyof typeof queryKeys;

const useStore = create<{ [key: string]: any }>((set) => ({
  state: {},
  save: (key: AllQueryKeys, value: any) => {
    return set((rootState) => ({
      state: {
        ...rootState.state,
        [key]: value,
      },
    }));
  },
}));

export const useSave = () => useStore((rootState) => rootState.save);
export const useGet = (key: AllQueryKeys) => useStore((rootState) => rootState.state?.[key]);
export default useStore;
