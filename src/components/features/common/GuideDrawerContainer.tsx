'use client';

import { NOTION_CV_GUIDE_URL } from '@/constants/link';
import { ReactNode } from 'react';

export default function GuideDrawerContainer({ drawerId, children }: { drawerId: string; children: ReactNode }) {
  return (
    <div className="drawer drawer-end">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor={drawerId} aria-label="close sidebar" className="drawer-overlay"></label>
        <section className="menu text-base-content min-h-full w-150 max-w-full bg-white">
          <iframe src={NOTION_CV_GUIDE_URL} className="grow" />
        </section>
      </div>
    </div>
  );
}
