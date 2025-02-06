import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function PreviewPage() {
  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-xl font-semibold text-red-500">PREVIEW PAGE</h1>
      <Link href={ROUTES.HOME}>
        <button className="btn btn-error">
          <span className="text-cobalt-500 text-sm font-semibold">홈으로 돌아가기</span>
        </button>
      </Link>
    </div>
  );
}
