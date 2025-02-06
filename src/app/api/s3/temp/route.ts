import { s3Client } from '@/lib/aws/config';
import { DeleteObjectsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const requestId = body.requestId;

    if (!requestId) {
      console.error('no requestId');
      return NextResponse.json({ error: 'requestId가 없습니다.' }, { status: 400 });
    }

    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_NOTION_CV_BUCKET_NAME,
      Prefix: `temp/${requestId}`,
    });
    const { Contents } = await s3Client.send(listCommand);
    if (!Contents?.length) return NextResponse.json({}, { status: 200 });

    await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: process.env.AWS_NOTION_CV_BUCKET_NAME,
        Delete: {
          Objects: Contents.map(({ Key }) => ({ Key })),
        },
      })
    );
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
  }
}
