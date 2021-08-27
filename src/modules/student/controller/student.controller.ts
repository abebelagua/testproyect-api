import { UpdateStudentDto } from "./../dto/updateStudent.dto";
import { CreateStudentDto } from "./../dto/createStudent.dto";
import { PaginationQueryDto } from "./../../../common/dto/pagination.dto";
import { StudentService } from "./../service/student.service";
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

@Controller("student")
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Get()
	public async getAllUseres(
		@Res() res,
		@Query() paginationQuery: PaginationQueryDto
	) {
		const useres = await this.studentService.findAll(paginationQuery);
		return res.status(HttpStatus.OK).json(useres);
	}

	@Get("/:id")
	public async getUser(@Res() res, @Param("id") id: string) {
		const user = await this.studentService.findById(id);
		if (!user) {
			throw new NotFoundException("Student does not exist!");
		}
		return res.status(HttpStatus.OK).json(user);
	}

	@Post()
	public async addUser(
		@Res() res,
		@Body() createStudentDto: CreateStudentDto
	) {
		try {
			const user = await this.studentService.create(createStudentDto);
			return res.status(HttpStatus.OK).json({
				message: "Student has been created successfully",
				user
			});
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: "Error: Student not created!",
				status: 400
			});
		}
	}

	@Put("/:id")
	public async updateUser(
		@Res() res,
		@Param("id") id: string,
		@Body() updateStudentDto: UpdateStudentDto
	) {
		try {
			const user = await this.studentService.update(id, updateStudentDto);
			if (!user) {
				throw new NotFoundException("Student does not exist!");
			}
			return res.status(HttpStatus.OK).json({
				message: "Student has been successfully updated",
				user
			});
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: "Error: Student not updated!",
				status: 400
			});
		}
	}

	@Delete("/:id")
	public async deleteUser(@Res() res, @Param("id") id: string) {
		const user = await this.studentService.remove(id);

		if (!user) {
			throw new NotFoundException("Student does not exist");
		}

		return res.status(HttpStatus.OK).json({
			message: "Student has been deleted",
			user
		});
	}
}
