import { create } from 'zustand';

type FileStore = {
  fileId: string | null;
  downloadToken: string | null;
  saveFileId: (fileTempId: string) => void;
  saveDownloadToken: (token: string) => void;
  resetFileId: () => void;
  resetFileInfo: () => void;
};

export const useFileStore = create<FileStore>((set) => {
  return {
    fileId: null,
    downloadToken: null,
    saveFileId: (fileTempId: string) => set((pre) => ({ ...pre, fileId: fileTempId })),
    saveDownloadToken: (downloadToken: string) => set((pre) => ({ ...pre, downloadToken })),
    resetFileId: () => set(() => ({ fileId: null })),
    resetFileInfo: () => set(() => ({ fileId: null, downloadToken: null })),
  };
});
