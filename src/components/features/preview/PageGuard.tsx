'use client';

import { ROUTES } from '@/constants/routes';
import { useFileStore } from '@/store/useFileStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * @function PageGuard (PreviewPage)
 * @description 하는 일 (1. fileId 없으면 home redirect / 2. google ads event 측정)
 */
export default function PageGuard() {
  const router = useRouter();
  const { fileId } = useFileStore();

  useEffect(() => {
    if (!fileId) {
      alert('업로드 된 파일이 확인되지 않습니다.\n다시 시도해 주세요.');
      router.replace(ROUTES.HOME);
    }
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}`,
      });
    }
  }, []);

  return null;
}
