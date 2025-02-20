import { v4 as uuidV4 } from 'uuid';

export class TokenManager {
  private static tokens = new Map<
    string,
    {
      fileKey: string;
      expiresAt: number;
    }
  >();

  static generateToken(fileKey: string): string {
    const newToken = uuidV4();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 5분

    this.tokens.set(newToken, {
      fileKey,
      expiresAt,
    });

    return newToken;
  }

  static validateToken(token: string): string | null {
    const tokenInfo = this.tokens.get(token);
    if (!tokenInfo) return null;

    if (Date.now() > tokenInfo.expiresAt) {
      this.tokens.delete(token);
      return null;
    }

    this.tokens.delete(token);
    return tokenInfo.fileKey;
  }
}
