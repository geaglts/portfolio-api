import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Config from '../../../environments/config';

@Injectable()
export class AuthService {
  constructor(@Inject(Config.KEY) private configVariables: ConfigType<typeof Config>) {}

  loginByApiKey(apiKey: string | undefined) {
    if (!apiKey) return { isValid: false };
    const { auth } = this.configVariables;
    return { isValid: apiKey === auth.apiKey };
  }
}
