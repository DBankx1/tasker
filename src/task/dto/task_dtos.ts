import { IsDateString, IsNumber, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    budget: number;

    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsNumber()
    @IsNotEmpty()
    location_type_id: number;

    @IsString()
    @IsOptional()
    location_value?: string;

    @IsDateString()
    @IsOptional()
    due_date?: Date;
}

export class SearchTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber()
    @IsOptional()
    min_budget?: number;

    @IsNumber()
    @IsOptional()
    max_budget?: number;

    @IsNumber()
    @IsOptional()
    category_id?: number;

    @IsNumber()
    @IsOptional()
    location_type_id?: number;

    @IsDateString()
    @IsOptional()
    due_date?: Date;
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber()
    @IsOptional()
    budget?: number;

    @IsNumber()
    @IsOptional()
    category_id?: number;

    @IsNumber()
    @IsOptional()
    location_type_id?: number;

    @IsString()
    @IsOptional()
    location_value?: string;

    @IsDateString()
    @IsOptional()
    due_date: Date;

}