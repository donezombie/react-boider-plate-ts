import { create } from "zustand";

interface ModalStore {
  openCount: number;
  increment: () => void;
  decrement: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  openCount: 0,
  increment: () => set((state) => ({ openCount: state.openCount + 1 })),
  decrement: () =>
    set((state) => ({ openCount: Math.max(0, state.openCount - 1) })),
}));

export default useModalStore;
