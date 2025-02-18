import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="t-0 fixed left-0 flex h-11 w-full items-center border-b border-b-gray-200 bg-white pr-6 pl-6">
      <Link href={ROUTES.HOME}>
        <div className="flex items-center gap-2.5">
          <figure>
            <Image src="/notion-cv.svg" alt="Notion CV logo" width={32.94} height={20} priority />
          </figure>
          <h1 className="text-md font-medium">Notion CV</h1>
        </div>
      </Link>
    </header>
  );
}
