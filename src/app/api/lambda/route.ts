import { InvokeCommand } from '@aws-sdk/client-lambda';
import { NextResponse } from 'next/server';
import { checkIsUUID } from '@/utils/uuid';
import { lambdaClient } from '@/lib/aws/config';
import { InvokeLambdaDto } from '@/types/dto/lambda.dto';
import { TokenManager } from '@/utils/TokenManager';
import { TOKEN_COOKIE_KEY } from '@/constants/token';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requestId = body.requestId;

    if (!requestId) {
      console.error('no requestId');
      return NextResponse.json({ error: 'requestId가 없습니다.' }, { status: 400 });
    }
    const isUUID = checkIsUUID(requestId);
    if (!isUUID) {
      console.error('requestId가 UUID 형식이 아닙니다.');
      return NextResponse.json({ error: 'requestId가 올바른 요청 형식이 아닙니다.' }, { status: 400 });
    }

    // lambda 호출
    const command = new InvokeCommand({
      FunctionName: process.env.LAMBDA_FUNCTION_NAME,
      Payload: JSON.stringify({ requestId }),
    });

    const lambdaResponse = await lambdaClient.send(command);
    const result = new TextDecoder().decode(lambdaResponse.Payload);
    const parsed = JSON.parse(result);
    const resBody = JSON.parse(parsed.body);

    const fileId = resBody.id;
    const newToken = TokenManager.generateToken(fileId);

    const response: InvokeLambdaDto = {
      id: resBody.id,
    };

    return new NextResponse(JSON.stringify(response), {
      headers: {
        'Set-Cookie': `${TOKEN_COOKIE_KEY}${newToken}; HttpOnly; Secure; SameSite=Strict; Path=/api/s3/temp/download`,
      },
    });
  } catch (e) {
    console.error('Lambda invocationerror: ', e);
    return NextResponse.json({ error: 'lambda function 실행에 실패했습니다.' }, { status: 500 });
  }
}
