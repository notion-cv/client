'use client';

import { useRef } from 'react';

export default function UploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <button className="btn btn-primary" onClick={onClickButton}>
        .zip 파일 업로드하기
      </button>
      <input type="file" accept=".zip" hidden ref={inputRef} />
    </>
  );
}
