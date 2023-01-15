import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../../environments/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { mongoUri } = configService.databases;
        return { uri: mongoUri };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
