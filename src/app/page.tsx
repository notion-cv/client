import UploadButton from '@/components/features/home/UploadButton';

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center p-12">
      <div className="flex flex-col items-center justify-start gap-4 pb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Notion CV</h1>
        <UploadButton />
      </div>
    </div>
  );
}
