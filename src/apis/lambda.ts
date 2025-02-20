import { InvokeLambdaDto } from '@/types/dto/lambda.dto';

export const callPdfConverter = async (requestId: string): Promise<InvokeLambdaDto> => {
  const response = await fetch('/api/lambda', { method: 'POST', body: JSON.stringify({ requestId }) });
  if (!response.ok) {
    return { id: null };
  }
  const data = await response.json();
  return data as InvokeLambdaDto;
};
