import { InvokeLambdaDto } from '@/types/dto/lambda.dto';

export const callPdfConverter = async (requestId: string) => {
  const response = await fetch('/api/lambda', { method: 'POST', body: JSON.stringify({ requestId }) });
  const data: InvokeLambdaDto = await response.json();
  return data.id;
};
