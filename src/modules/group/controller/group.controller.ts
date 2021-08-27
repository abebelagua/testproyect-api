import { UpdateGroupDto } from "./../dto/updateGroup.dto";
import { CreateGroupDto } from "./../dto/createGroup.dto";
import { PaginationQueryDto } from "./../../../common/dto/pagination.dto";
import { GroupService } from "./../service/group.service";
import {
	Controller,
	Get,
	Res,
	HttpStatus,
	Post,
	Body,
	Put,
	NotFoundException,
	Delete,
	Param,
	Query
} from "@nestjs/common";

@Controller("group")
export class GroupController {
	constructor(private groupService: GroupService) {}

	@Get()
	public async getAll(
		@Res() res,
		@Query() paginationQuery: PaginationQueryDto
	) {
		const groups = await this.groupService.findAll(paginationQuery);
		return res.status(HttpStatus.OK).json(groups);
	}

	@Get("/:id")
	public async get(@Res() res, @Param("id") id: string) {
		const group = await this.groupService.findById(id);
		if (!group) {
			throw new NotFoundException("Group does not exist!");
		}
		return res.status(HttpStatus.OK).json(group);
	}

	@Post()
	public async add(@Res() res, @Body() createGroupDto: CreateGroupDto) {
		try {
			const group = await this.groupService.create(createGroupDto);
			return res.status(HttpStatus.OK).json({
				message: "Group has been created successfully",
				group
			});
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: "Error: Group not created!",
				status: 400
			});
		}
	}

	@Put("/:id")
	public async update(
		@Res() res,
		@Param("id") id: string,
		@Body() updateGroupDto: UpdateGroupDto
	) {
		try {
			const group = await this.groupService.update(id, updateGroupDto);
			if (!group) {
				throw new NotFoundException("Group does not exist!");
			}
			return res.status(HttpStatus.OK).json({
				message: "Group has been successfully updated",
				group
			});
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: "Error: Group not updated!",
				status: 400
			});
		}
	}

	@Delete("/:id")
	public async delete(@Res() res, @Param("id") id: string) {
		const group = await this.groupService.remove(id);

		if (!group) {
			throw new NotFoundException("Group does not exist");
		}

		return res.status(HttpStatus.OK).json({
			message: "Group has been deleted",
			group
		});
	}
}
