import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// modules
import { ProjectsModule } from './modules/projects/projects.module';
import { DatabaseModule } from './modules/database/database.module';

// enviroment configs
import getEnvironment from './environments/getEnvironment';
import config, { envValidation } from './environments/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironment(process.env.NODE_ENV),
      isGlobal: true,
      load: [config],
      validationSchema: envValidation,
    }),
    ProjectsModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
