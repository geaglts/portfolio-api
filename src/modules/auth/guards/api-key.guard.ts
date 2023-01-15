import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';

import config from '../../../environments/config';

import { PUBLIC_DECORATOR_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configVariables: ConfigType<typeof config>,
  ) {}

  canActivate(context: ExecutionContext) {
    // if the endpoint is public then can't request the api key
    const isPublic = this.reflector.get(
      PUBLIC_DECORATOR_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;
    // get the api key header from the request and compare if are the same
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.header('api-key');
    // if api key not exists, then return unauthorized exception
    if (!apiKey) {
      throw new UnauthorizedException(
        'No estás autorizado, verifica tu información.',
      );
    }
    const haveAccess = apiKey === this.configVariables.auth.apiKey;
    // if is a bad api key then return unauthorized exception
    if (!haveAccess) {
      throw new UnauthorizedException(
        'No estás autorizado, verifica tu información.',
      );
    }
    return true;
  }
}
