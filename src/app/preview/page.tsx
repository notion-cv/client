import { ROUTES } from '@/constants/routes';
import { Button } from '@headlessui/react';
import Link from 'next/link';

export default function PreviewPage() {
  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-xl font-semibold text-red-500">PREVIEW PAGE</h1>
      <Link href={ROUTES.HOME}>
        <Button className="cursor-pointer rounded-sm bg-gray-200 pt-2 pr-3 pb-2 pl-3">
          <span className="text-sm font-semibold text-slate-900">홈으로 돌아가기</span>
        </Button>
      </Link>
    </div>
  );
}
