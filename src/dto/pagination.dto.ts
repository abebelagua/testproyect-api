import { IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationQueryDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	@IsPositive()
	limit: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	@IsPositive()
	offset: string;
}
