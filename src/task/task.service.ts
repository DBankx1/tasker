import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { CreateTaskDto, SearchTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
    constructor(private db_service: DbService) { }

    async create_task(user_id: number, data: CreateTaskDto) {
        return await this.db_service.task.create({
            data: {
                user_id,
                ...data
            }
        })
    }

    async get_task_by_id(task_id: number) {
        return await this.db_service.task.findUnique({
            where: { id: task_id }
        });
    }

    async search_tasks(data: SearchTaskDto) {
        const { min_budget, max_budget, due_date, ...rest } = data;
        return await this.db_service.task.findMany({
            where: {
                ...rest,
                budget: {
                    lt: max_budget,
                    gt: min_budget || 0
                }
            }
        })
    }

    async update_task(user_id: number, id: number, data: UpdateTaskDto) {
        // check if task is owned by user
        const task = await this.db_service.task.findUnique({ where: { id } });

        if (!task) throw new NotFoundException('Task not found');

        if (task.user_id !== user_id) throw new UnauthorizedException('Unauthorised access');

        return await this.db_service.task.update({
            where: {
                id,
            },
            data
        });
    }

    async delete_task(user_id: number, id: number) {
        // check if task is owned by user
        const task = await this.db_service.task.findUnique({ where: { id } });

        if (!task) throw new NotFoundException('Task not found');

        if (task.user_id !== user_id) throw new UnauthorizedException('Unauthorised access');

        await this.db_service.task.delete({
            where: { id }
        });
    }
}
