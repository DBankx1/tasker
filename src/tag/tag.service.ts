import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTagDto } from './dto';

@Injectable()
export class TagService {
    constructor(private db_service: DbService) { }

    async create_app_tag(tag_type_id: number, description: string) {
        return this.db_service.tag.create({
            data: {
                tag_type_id,
                description
            }
        });
    }

    async create_user_tag(tag_type_id: number, user_id: number, data: CreateTagDto) {
        return this.db_service.tag.create({
            data: {
                tag_type_id,
                user_id,
                description: data.description,
                created_by_user: true
            }
        });
    }

    async get_tag_by_id(id: number) {
        return this.db_service.tag.findUnique({
            where: {
                id
            }
        });
    }

    async get_tag_by_description(description: string) {
        return this.db_service.tag.findFirst({
            where: {
                description
            }
        });
    }
}
