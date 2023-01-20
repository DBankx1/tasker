import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbService } from './db.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DbService],
  exports: [DbService]
})
export class DbModule { }
