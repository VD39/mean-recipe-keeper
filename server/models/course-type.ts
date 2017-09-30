// Import dependencies
import { Schema, Document, Model, model } from 'mongoose';

// Import interface
import { ICourseType } from '../interfaces/course-type.interface';

// Create course type schema
const CourseTypeSchema: Schema = new Schema({
  type: {
    type: String,
    required: [true, 'Type is required.']
  }
});

interface ICourseTypeModel extends ICourseType, Document { }

// Course type model
const CourseType: Model = model<ICourseTypeModel>('CourseType', CourseTypeSchema);

// Export
export { CourseType };
