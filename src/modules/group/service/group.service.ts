import { PaginationQueryDto } from "./../../../common/dto/pagination.dto";
import { UpdateGroupDto } from "./../dto/updateGroup.dto";
import { CreateGroupDto } from "./../dto/createGroup.dto";
import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Group, GroupDocument } from "../../../schemas/group.schema";

@Injectable()
export class GroupService {
	constructor(
		@InjectModel(Group.name) private groupModel: Model<GroupDocument>
	) {}

	async findAll(paginationQuery: PaginationQueryDto): Promise<Group[]> {
		const { limit, offset } = paginationQuery;
		return this.groupModel
			.find()
			.skip(parseInt(offset))
			.limit(parseInt(limit))
			.populate({ path: "students", model: "Student" })
			.exec();
	}

	async findOne(group: any): Promise<Group> {
		return this.groupModel
			.findOne({
				...group
			})
			.populate({ path: "students", model: "Student" })
			.exec();
	}

	async findById(id: string): Promise<Group> {
		const group = await this.groupModel.findById({ _id: id }).exec();

		if (!group) {
			throw new NotFoundException(`Group with ${id} not found`);
		}

		return group;
	}

	async create(createGroupDto: CreateGroupDto): Promise<Group> {
		const group = new this.groupModel(createGroupDto);
		return await group.save();
	}

	public async update(id: string, updateGroupDto: any): Promise<Group> {
		const group = await this.groupModel.findByIdAndUpdate(
			{ _id: id },
			updateGroupDto
		);

		if (!group) {
			throw new NotFoundException(`Group with ${id} not found`);
		}

		return group;
	}

	public async remove(id: string): Promise<Group> {
		const group = await this.groupModel.findByIdAndRemove(id);

		if (!group) {
			throw new NotFoundException(`Group with ${id} not found`);
		}

		return group;
	}
}
