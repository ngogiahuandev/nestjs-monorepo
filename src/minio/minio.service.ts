import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'minio';
import { env } from 'src/lib/env';

@Injectable()
export class MinioService {
  constructor(@Inject(env.MINIO_TOKEN) private readonly client: Client) {}

  async generatePresignedPutUrl(
    bucket: string,
    objectName: string,
    expiry = 300,
  ): Promise<string> {
    return await this.client.presignedPutObject(bucket, objectName, expiry);
  }

  async checkFileExists(bucket: string, objectName: string): Promise<boolean> {
    try {
      await this.client.statObject(bucket, objectName);
      return true;
    } catch {
      return false;
    }
  }

  getPublicUrl(bucket: string, objectName: string): string {
    return `${env.MINIO_PUBLIC_URL}/${bucket}/${objectName}`;
  }
}
