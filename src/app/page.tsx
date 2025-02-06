import { ROUTES } from '@/constants/routes';
import { Button } from '@headlessui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="text-4xl font-extrabold text-blue-600">HOME PAGE</h1>
      <Link href={ROUTES.PREVIEW}>
        <Button className="cursor-pointer rounded-sm bg-green-500 pt-2 pr-3 pb-2 pl-3">
          <span className="text-sm font-semibold text-white">PDF로 변환하기</span>
        </Button>
      </Link>
    </div>
  );
}
