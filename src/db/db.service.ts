import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { CATEGORIES, LOCATION_TYPES, TAG_TYPES } from 'src/util/app/constants';

@Injectable()
export class DbService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        })
    }

    async bootstrap_db() {
        try {
            console.log('-----------BOOTSTRAPPING DB------------')

            // seed all the neccessary items needed to run the app in the db

            // tag_types & tags
            TAG_TYPES.forEach(async (tag_type) => {
                await this.tag_Type.create({ data: { description: tag_type, } })
            })

            // get category tag_type
            const category_tag_type = await this.tag_Type.findFirst({ where: { description: "category" } });

            // create all category tags
            CATEGORIES.forEach(async (category) => {
                await this.tag.create({
                    data: {
                        tag_type_id: category_tag_type.id,
                        description: category
                    }
                })
            });

            // get location tag_type
            const location_tag_type = await this.tag_Type.findFirst({ where: { description: "location" } });

            // create all category tags
            LOCATION_TYPES.forEach(async (location_type) => {
                await this.tag.create({
                    data: {
                        tag_type_id: location_tag_type.id,
                        description: location_type
                    }
                })
            });

            console.log('-----------DONE BOOTSTRAPPING DB------------')
        } catch (error) {
            throw error;
        }
    }
}
