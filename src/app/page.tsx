import UploadButton from '@/components/features/home/UploadButton';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center p-12">
      <div className="flex flex-col items-center justify-start gap-4 pb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Notion CV</h1>
        <UploadButton />
        <Link href={ROUTES.PREVIEW}>
          <button className="btn btn-outline btn-sm">
            <span className="">PREVIEW 페이지로 이동하기</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
