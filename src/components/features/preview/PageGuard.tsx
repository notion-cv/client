'use client';

import { ROUTES } from '@/constants/routes';
import { useFileStore } from '@/store/useFileStore';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

/**
 * @function PageGuard (PreviewPage)
 * @description 하는 일 (1. fileId 없으면 home redirect / 2. google ads event 측정)
 */
export default function PageGuard() {
  const isExecuted = useRef<boolean>(false); // 실행 여부 추적

  const router = useRouter();
  const { fileId } = useFileStore();

  useEffect(() => {
    if (!fileId) {
      alert('업로드 된 파일이 확인되지 않습니다.\n다시 시도해 주세요.');
      router.replace(ROUTES.HOME);
      return;
    }

    if (isExecuted.current) return;

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }

      // gtag.js가 로드된 후 실행되도록 함
      if (!window.gtag) {
        window.gtag = gtag;
      }

      window.gtag('js', new Date());
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ADS_ID!);
      window.gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_ID}`,
      });
      isExecuted.current = true;
    }
  }, []);

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      ></Script>
    </>
  );
}
