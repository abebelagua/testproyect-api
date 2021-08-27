import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GroupDocument = Group & Document;

@Schema()
export class Group {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ required: true })
	mainTeacher: string;

	@Prop({ type: Date, default: Date.now })
	updatedAt: Date;

	@Prop({ type: Date, default: Date.now })
	createdAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
