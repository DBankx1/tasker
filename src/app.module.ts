import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TagTypeModule } from './tag_type/tag_type.module';
import { TagModule } from './tag/tag.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DbModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, TagTypeModule, TagModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
