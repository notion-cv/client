import GuideButton from '@/components/features/home/HomeGuideButton';
import UploadButton from '@/components/features/home/UploadButton';
import Image from 'next/image';

export default function Home() {
  const howtouseWidth = 300;
  const howtoUseHeight = Math.floor(howtouseWidth * (462 / 360));
  const howtoUseProps = {
    width: howtouseWidth,
    height: howtoUseHeight,
  };
  return (
    <div className="flex min-h-full w-full items-center justify-center overflow-auto p-12">
      <div className="flex flex-col items-center justify-start gap-12 pb-8">
        <section className="flex gap-6">
          <Image src="/howtouse/howtouse_1.png" alt="Notion CV 사용법 1" {...howtoUseProps} />
          <Image src="/howtouse/howtouse_2.png" alt="Notion CV 사용법 2" {...howtoUseProps} />
          <Image src="/howtouse/howtouse_3.png" alt="Notion CV 사용법 3" {...howtoUseProps} />
        </section>
        <section className="flex flex-col items-center gap-2">
          <UploadButton />
          <div className="flex items-center gap-2">
            <span className="text-md text-md whitespace-nowrap">더 궁금한 내용이 있다면?</span>
            <GuideButton />
          </div>
        </section>
      </div>
    </div>
  );
}
