'use client';

import { useLoaderStore } from '@/store/useLoaderStore';

export default function PageLoader() {
  const { isLoading, description } = useLoaderStore();
  if (!isLoading) return null;
  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-70" />
      <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center">
        <div className="flex h-50 w-50 flex-col items-center justify-around rounded-full">
          <span className="loading loading-infinity loading-xl fixed mb-8 bg-white"></span>
          {description && <span className="mt-8 font-semibold text-white">{description}</span>}
        </div>
      </div>
    </>
  );
}
