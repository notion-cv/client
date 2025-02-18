'use client';

import { deleteTempDirectory, downloadPdfFile } from '@/apis/s3';
import { ROUTES } from '@/constants/routes';
import { useFileStore } from '@/store/useFileStore';
import { useRouter } from 'next/navigation';

export function DownloadButton() {
  const router = useRouter();
  const { fileId, resetFileId } = useFileStore();

  const goToHome = () => {
    router.push(ROUTES.HOME);
  };

  const downloadFile = async (fileId: string) => {
    const { fileUrl } = await downloadPdfFile(fileId);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `cv_result.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(fileUrl);

    // 기존 파일 삭제
    await deleteTempDirectory(fileId);
    return true;
  };

  const handleClickDownload = async () => {
    if (!fileId) {
      alert('업로드 기록이 없습니다.\n다시 시도해 주세요.');
      goToHome();
      return;
    }
    const isFulfilled = await downloadFile(fileId);
    alert(isFulfilled ? '다운로드가 완료되었습니다🥳' : '다운로드에 실패했습니다. 다시 시도해 주세요.');
    resetFileId();
    goToHome();
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <button className="btn btn-primary btn-md btn-block" disabled={!fileId} onClick={handleClickDownload}>
        PDF 다운받기
      </button>
      {!fileId && (
        <span className="text-error text-xs font-medium">현재 업로드 된 파일이 없어요. 파일을 등록해 주세요.</span>
      )}
    </div>
  );
}
