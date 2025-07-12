import { Global, Module } from '@nestjs/common';
import * as Minio from 'minio';
import { env } from 'src/lib/env';

@Module({
  exports: [env.MINIO_TOKEN],
  providers: [
    {
      provide: env.MINIO_TOKEN,
      useFactory: (): Minio.Client => {
        const client = new Minio.Client({
          endPoint: env.MINIO_ENDPOINT,
          port: env.MINIO_PORT,
          accessKey: env.MINIO_ACCESS_KEY,
          secretKey: env.MINIO_SECRET_KEY,
          useSSL: false,
        });
        return client;
      },
    },
  ],
})
export class MinioModule {}
