import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TagTypeService {
    constructor(private db_service: DbService) { }

    async create_tag_type(description: string) {
        return await this.db_service.tag_Type.create({
            data: {
                description
            }
        });
    }

    async get_tag_type_by_id(id: number) {
        return await this.db_service.tag_Type.findUnique({
            where: {
                id
            }
        });
    }

    async get_tag_type_id_by_description(description: string) {
        return await this.db_service.tag_Type.findFirst({
            where: {
                description
            }
        });
    }

    async get_tag_types() {
        return await this.db_service.tag_Type.findMany();
    }
}
