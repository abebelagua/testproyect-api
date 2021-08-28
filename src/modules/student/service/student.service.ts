import { GroupService } from "../../group/service/group.service";
import { PaginationQueryDto } from "./../../../dto/pagination.dto";
import { UpdateStudentDto } from "./../dto/updateStudent.dto";
import { CreateStudentDto } from "./../dto/createStudent.dto";
import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Student, StudentDocument } from "../../../schemas/student.schema";

@Injectable()
export class StudentService {
	constructor(
		@InjectModel(Student.name) private studentModel: Model<StudentDocument>
	) {}

	async findAll(
		paginationQuery: PaginationQueryDto,
		findStudentDto: any
	): Promise<Student[]> {
		const { limit, offset } = paginationQuery;
		return this.studentModel
			.find(findStudentDto)
			.skip(parseInt(offset))
			.limit(parseInt(limit))
			.populate({ path: "group", model: "Group" })
			.exec();
	}

	async findOne(student: any): Promise<Student> {
		return this.studentModel
			.findOne({
				...student
			})
			.populate({ path: "group", model: "Group" })
			.exec();
	}

	async findById(id: string): Promise<Student> {
		const student = await this.studentModel.findById({ _id: id }).exec();

		if (!student) {
			throw new NotFoundException(`Student with ${id} not found`);
		}

		return student;
	}

	async create(createStudentDto: CreateStudentDto): Promise<Student> {
		const student = new this.studentModel(createStudentDto);
		return await student.save();
	}

	public async update(id: string, updateStudentDto: any): Promise<Student> {
		const student = await this.studentModel.findByIdAndUpdate(
			{ _id: id },
			updateStudentDto
		);

		if (!student) {
			throw new NotFoundException(`Student with ${id} not found`);
		}

		return student;
	}

	public async remove(id: string): Promise<Student> {
		const student = await this.studentModel.findByIdAndUpdate(
			{ _id: id },
			{
				deleted: true
			}
		);

		if (!student) {
			throw new NotFoundException(`Student with ${id} not found`);
		}

		return student;
	}
}
