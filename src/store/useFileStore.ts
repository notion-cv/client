import { create } from 'zustand';

type FileStore = {
  fileId: string | null;
  saveFileId: (fileTempId: string) => void;
  resetFileId: () => void;
};

export const useFileStore = create<FileStore>((set) => {
  return {
    fileId: null,
    saveFileId: (fileTempId: string) => set((pre) => ({ ...pre, fileId: fileTempId })),
    resetFileId: () => set(() => ({ fileId: null })),
  };
});
