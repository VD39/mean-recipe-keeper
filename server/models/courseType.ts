import * as mongoose from "mongoose";

// create Recipe Schema & model
const CourseTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Type is required.']
  }
});

const CourseType = mongoose.model('CourseType', CourseTypeSchema);


export { CourseType };
