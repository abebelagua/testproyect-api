import { IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
	IsNotEmpty,
	IsString,
	IsEmail,
	IsNumber,
	IsEnum
} from "class-validator";

export class StudentDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	age: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEnum(["M", "F"])
	genre: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsDate()
	birthDate: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	birthCity: string;
}
