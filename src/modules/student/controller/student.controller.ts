import { GroupService } from "./../../group/service/group.service";
import { UpdateStudentDto } from "./../dto/updateStudent.dto";
import { CreateStudentDto } from "./../dto/createStudent.dto";
import { PaginationQueryDto } from "./../../../dto/pagination.dto";
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
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Estudiante")
@Controller("student")
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Post("/all")
	public async getAll(
		@Res() res,
		@Query() paginationQuery: PaginationQueryDto,
		@Body() findStudentDto: UpdateStudentDto
	) {
		const students = await this.studentService.findAll(
			paginationQuery,
			findStudentDto
		);
		return res.status(HttpStatus.OK).json(students);
	}

	@Get("/:id")
	public async get(@Res() res, @Param("id") id: string) {
		const student = await this.studentService.findById(id);
		if (!student) {
			throw new NotFoundException("Student does not exist!");
		}
		return res.status(HttpStatus.OK).json(student);
	}

	@Post()
	public async add(@Res() res, @Body() createStudentDto: CreateStudentDto) {
		try {
			const student = await this.studentService.create(createStudentDto);
			return res.status(HttpStatus.OK).json({
				message: "Student has been created successfully",
				student
			});
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: "Error: Student not created!",
				status: 400
			});
		}
	}

	@Put("/:id")
	public async update(
		@Res() res,
		@Param("id") id: string,
		@Body() updateStudentDto: UpdateStudentDto
	) {
		try {
			const student = await this.studentService.update(
				id,
				updateStudentDto
			);
			if (!student) {
				throw new NotFoundException("Student does not exist!");
			}
			return res.status(HttpStatus.OK).json({
				message: "Student has been successfully updated",
				student
			});
		} catch (err) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: "Error: Student not updated!",
				status: 400
			});
		}
	}

	@Delete("/:id")
	public async delete(@Res() res, @Param("id") id: string) {
		const student = await this.studentService.remove(id);

		if (!student) {
			throw new NotFoundException("Student does not exist");
		}

		return res.status(HttpStatus.OK).json({
			message: "Student has been deleted",
			student
		});
	}
}
