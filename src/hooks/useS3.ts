import { s3Client } from '@/lib/aws/config';
import { DeleteObjectsCommand, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';

export const useS3 = () => {
  const uploadZip = async (fileId: string, file: File) => {
    const putCommand = new PutObjectCommand({
      Bucket: 'notion-cv',
      Key: `temp/${fileId}/${fileId}.zip`,
      Body: file,
    });
    return await s3Client.send(putCommand);
  };

  const deleteAll = async (fileId: string) => {
    try {
      const listCommand = new ListObjectsV2Command({ Bucket: 'notion-cv', Prefix: `temp/${fileId}/` });

      const { Contents } = await s3Client.send(listCommand);
      if (!Contents?.length) return;

      await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: 'notion-cv',
          Delete: {
            Objects: Contents.map(({ Key }) => ({ Key })),
          },
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return { uploadZip, deleteAll };
};
