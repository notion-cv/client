import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="t-0 fixed left-0 flex h-11 w-full items-center border-b border-b-gray-200 bg-white pr-6 pl-6">
      <Link href={ROUTES.HOME}>
        <figure>
          <Image src="/notion-cv.svg" alt="Notion CV logo" width={32.94} height={20} priority />
        </figure>
      </Link>
    </header>
  );
}
