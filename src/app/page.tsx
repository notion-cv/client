import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-8">
      <h1 className="text-4xl font-extrabold text-blue-600">HOME PAGE</h1>
      <Link href={ROUTES.PREVIEW}>
        <button className="btn btn-primary">
          <span className="">PDF로 변환하기</span>
        </button>
      </Link>
    </div>
  );
}
