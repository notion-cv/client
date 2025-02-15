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

export const deleteTempDirectory = async (fileId: string) => {
  const response = await fetch('/api/s3/temp', {
    method: 'DELETE',
    body: JSON.stringify({ requestId: fileId }),
  });
  return response.json();
};
