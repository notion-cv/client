import { create } from 'zustand';

type LoaderStore = {
  isLoading: boolean;
  description: string | null;
  startLoading(description?: string): void;
  endLoading(): void;
  setLoading(isLoading: boolean, description?: string): void;
};

export const useLoaderStore = create<LoaderStore>((set) => {
  return {
    isLoading: false,
    description: null,
    startLoading: (description?: string) => set(() => ({ isLoading: true, description: description ?? null })),
    endLoading: () => set(() => ({ isLoading: false, description: null })),
    setLoading: (isLoading: boolean, description?: string) =>
      set(() => ({ isLoading, description: !isLoading ? null : (description ?? null) })),
  };
});
