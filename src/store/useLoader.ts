import { create } from 'zustand';

type LoaderStore = {
  isLoading: boolean;
  startLoading(): void;
  endLoading(): void;
  setLoading(isLoading: boolean): void;
};

export const useLoaderStore = create<LoaderStore>((set) => {
  return {
    isLoading: false,
    startLoading: () => set(() => ({ isLoading: true })),
    endLoading: () => set(() => ({ isLoading: false })),
    setLoading: (isLoading: boolean) => set(() => ({ isLoading })),
  };
});
