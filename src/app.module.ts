import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
