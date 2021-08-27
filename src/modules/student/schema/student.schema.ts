import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1, isInteger: true })
  age: number;

  @Prop({ required: true, enum: ['M', 'F'] })
  genre: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        // &&
        // this.model('Student')
        //   .findOne({ email: v })
        //   .then((student) => !student)
      },
      message: (props) => `${props.value} have an invalid format`,
    },
  })
  email: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  birthCity: string;

  //TODO falta el grupo

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
