import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { AuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateTaskDto, SearchTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private task_service: TaskService) { }

    // Endpoint to create tasks
    @UseGuards(AuthGuard)
    @Post('/')
    create_task(@Body() data: CreateTaskDto, @GetUser() user: User) {
        return this.task_service.create_task(user.id, data);
    }

    // Endpoint to search for tasks with different params
    @Get('/')
    search_tasks(@Query() query: SearchTaskDto) {
        return this.task_service.search_tasks(query);
    }

    // Endpoint to get task details
    @Get('/:id')
    get_task_by_id(@Param('id', ParseIntPipe) id: number) {
        return this.task_service.get_task_by_id(id);
    }

    // Endpoint to update task
    @UseGuards(AuthGuard)
    @Patch('/:id')
    update_task(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto, @GetUser('id') user_id: number) {
        return this.task_service.update_task(user_id, id, data);
    }

    // Endpoint to delete task
    @UseGuards(AuthGuard)
    @Delete('/:id')
    delete_task(@Param('id', ParseIntPipe) id: number, @GetUser('id') user_id: number) {
        return this.task_service.delete_task(id, user_id);
    }

}
