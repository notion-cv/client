import { DownloadButton } from '@/components/features/preview/DownloadButton';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function PreviewPage() {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="grid h-full w-full max-w-360 grid-cols-4 gap-6 pt-6 pr-8 pb-6 pl-8">
        <section className="col-span-3 rounded-lg border border-gray-300">
          <figure></figure>
        </section>
        <section className="flex h-full flex-col justify-between">
          <div className="col-span-1 flex flex-col items-start gap-2">
            <Link href={ROUTES.HOME}>
              <button className="btn btn-sm">다시 돌리기</button>
            </Link>
            <DownloadButton />
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-gray-300 p-4">
            <h5 className="font-bold text-gray-900">사용법을 잘 모르겠다면?</h5>
            <button className="btn btn-outline btn-sm">사용가이드 보기</button>
          </div>
        </section>
      </div>
    </div>
  );
}
