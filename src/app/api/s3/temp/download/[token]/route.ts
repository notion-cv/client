import { s3Client } from '@/lib/aws/config';
import { TokenManager } from '@/utils/TokenManager';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

export async function GET(request: Request, props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  const token = params.token;

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ error: '유효한 요청이 아닙니다.' }, { status: 400 });
  }
  const fileId = TokenManager.validateToken(token);
  if (!fileId) {
    return NextResponse.json({ error: '유효한 요청이 아닙니다.' }, { status: 400 });
  }
  try {
    const key = `temp/${fileId}/${fileId}.result.pdf`;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_NOTION_CV_BUCKET_NAME,
      Key: key,
    });
    const s3Res = await s3Client.send(command);
    const stream = s3Res.Body;

    if (!stream) {
      return NextResponse.json({ error: '파일이 존재하지 않습니다.' }, { status: 404 });
    }

    // Stream the file to response
    const arrayBuffer = await stream.transformToByteArray();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/application/pdf', // 바이너리 데이터 전송
        'Content-Disposition': `attachment; filename=resume_${fileId}`, // 다운로드 옵션
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '일시적으로 문제가 발생했습니다.' }, { status: 500 });
  }
}
