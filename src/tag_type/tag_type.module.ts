import { Global, Module } from '@nestjs/common';
import { TagTypeService } from './tag_type.service';

@Global()
@Module({
  providers: [TagTypeService]
})
export class TagTypeModule { }
