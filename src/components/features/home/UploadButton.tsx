'use client';

import { ChangeEvent, useRef } from 'react';
import JSZip from 'jszip';
import { checkHasHtmlFile } from '@/utils/checkHasHtmlFile';
import { v4 as uuidv4 } from 'uuid';
import { useFileStore } from '@/store/useFileStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { uploadZipFile } from '@/apis/s3';
import { callPdfConverter } from '@/apis/lambda';
import { putTempZipDto } from '@/types/dto/s3.dto';
import { InvokeLambdaDto } from '@/types/dto/lambda.dto';
import { useLoaderStore } from '@/store/useLoaderStore';

export default function UploadButton() {
  const router = useRouter();
  const { saveFileId, resetFileId } = useFileStore();
  const { startLoading, endLoading } = useLoaderStore();

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChangeError = () => {
    resetFileId();
    router.push(ROUTES.HOME);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || !files[0]) throw new Error('업로드 된 파일이 없어요.');
      startLoading('PDF를 변환하고 있어요...');

      // ZIP 파일 읽기
      const file = files[0];
      const zip = new JSZip();
      const zipContents = await zip.loadAsync(file);

      const hasHtmlFile = checkHasHtmlFile(zipContents);

      if (!hasHtmlFile) throw new Error('HTML 파일이 없는 압축 파일이에요. 다시 확인해 주세요.');

      // s3 업로드
      const fileId = uuidv4();
      const res: putTempZipDto = await uploadZipFile(fileId, file);
      if (!res.fileId) throw new Error('일시적인 문제가 발생했습니다.');

      const lambdaRes: InvokeLambdaDto = await callPdfConverter(fileId);
      if (!lambdaRes.id) throw new Error('PDF 변환에 실패했습니다.');

      saveFileId(lambdaRes.id);
      router.push(ROUTES.PREVIEW);
      endLoading();
    } catch (e) {
      console.error('Error: ', e);
      if (e instanceof Error) {
        alert(e.message);
      }
      endLoading();
      onFileChangeError();
    }
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        파일 등록하고 변환하기
      </button>
      <input type="file" accept=".zip" hidden ref={inputRef} onChange={handleFileChange} />
    </>
  );
}
