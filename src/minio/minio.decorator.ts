import { Inject } from '@nestjs/common';
import { env } from 'src/lib/env';

export function InjectMinio(): ParameterDecorator {
  return Inject(env.MINIO_TOKEN);
}
