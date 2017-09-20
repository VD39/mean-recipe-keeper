import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

// create Recipe Schema & model
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Methods to compare password to encrypted password upon login
UserSchema.methods.comparePassword = (bodyPassword, userPassword) => {
  return bcrypt.compareSync(bodyPassword, userPassword, (error, isMatch) => {
    if (error) {
      return error;
    }
    return isMatch;
  });
};

const User = mongoose.model('User', UserSchema);

export { User };
