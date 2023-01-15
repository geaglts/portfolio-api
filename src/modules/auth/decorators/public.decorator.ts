import { SetMetadata } from '@nestjs/common';

export const PUBLIC_DECORATOR_KEY = 'public';

export const Public = () => SetMetadata(PUBLIC_DECORATOR_KEY, true);
