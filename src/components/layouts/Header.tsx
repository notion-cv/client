import { NOTION_CV_LANDING_URL } from '@/constants/link';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="t-0 fixed left-0 flex h-11 w-full items-center border-b border-b-gray-200 bg-white pr-6 pl-6">
      <Link href={NOTION_CV_LANDING_URL}>
        <div className="flex items-center gap-2.5">
          <h1 className="text-md font-medium">Notion CV</h1>
        </div>
      </Link>
    </header>
  );
}
