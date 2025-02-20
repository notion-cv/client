export const uploadZipFile = async (fileId: string, zipFile: File) => {
  const formData = new FormData();
  formData.append('fileId', fileId);
  formData.append('file', zipFile);
  const response = await fetch(`/api/s3/temp`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

export const downloadPdfFile = async () => {
  const response = await fetch(`/api/s3/temp/download`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('다운로드에 실패했습니다.');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  return { fileUrl: url };
};

export const deleteTempDirectory = async (fileId: string) => {
  const response = await fetch('/api/s3/temp', {
    method: 'DELETE',
    body: JSON.stringify({ requestId: fileId }),
  });
  return response.json();
};
