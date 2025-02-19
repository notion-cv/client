'use client';

import { ROUTES } from '@/constants/routes';
import { useFileStore } from '@/store/useFileStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * @function PageGuard (PreviewPage)
 * @description 하는 일 (1. fileId 없으면 home redirect / 2. ga event 측정)
 */
export default function PageGuard() {
  const router = useRouter();
  const { fileId } = useFileStore();

  useEffect(() => {
    if (!fileId) {
      alert('업로드 된 파일이 확인되지 않습니다.\n다시 시도해 주세요.');
      sendGAEvent('denied_preview_page', { description: 'noFileId' });
      router.replace(ROUTES.HOME);
    }
    sendGAEvent('visit_preview_page');
  }, []);

  return null;
}
