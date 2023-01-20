import { NestFactory } from "@nestjs/core";
import { DbModule } from "./db/db.module";
import { DbService } from "./db/db.service";

async function bootstrap() {
    NestFactory.createApplicationContext(DbModule).then(appContext => {
        const db_service = appContext.get(DbService);

        db_service.bootstrap_db().catch(error => { throw error }).finally(() => appContext.close());


    }).catch(error => {
        throw error;
    })
}

bootstrap();