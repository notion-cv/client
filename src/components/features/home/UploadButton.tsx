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

export default function UploadButton() {
  const router = useRouter();
  const { saveFileId, resetFileId } = useFileStore();

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
      if (!files || !files[0]) {
        alert('업로드 된 파일이 없어요.');
        onFileChangeError();
        return;
      }

      // ZIP 파일 읽기
      const file = files[0];
      const zip = new JSZip();
      const zipContents = await zip.loadAsync(file);

      const hasHtmlFile = checkHasHtmlFile(zipContents);

      if (!hasHtmlFile) {
        alert('HTML 파일이 없는 압축 파일이에요. 다시 확인해 주세요.');
        onFileChangeError();
        return;
      }
      // s3 업로드
      const fileId = uuidv4();
      const res: putTempZipDto = await uploadZipFile(fileId, file);
      if (!res.fileId) {
        alert('일시적인 문제가 발생했습니다.');
        onFileChangeError();
        return;
      }
      const lambdaRes: InvokeLambdaDto = await callPdfConverter(fileId);
      if (!lambdaRes.id) {
        alert('PDF 변환에 실패했습니다.');
        onFileChangeError();
        return;
      }
      saveFileId(lambdaRes.id);
      router.push(ROUTES.PREVIEW);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
        .zip 파일 업로드하기
      </button>
      <input type="file" accept=".zip" hidden ref={inputRef} onChange={handleFileChange} />
    </>
  );
}
