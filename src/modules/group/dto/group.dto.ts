import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, IsBoolean } from "class-validator";

export class GroupDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	mainTeacher: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	students: [string];

	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	deleted: boolean;
}
