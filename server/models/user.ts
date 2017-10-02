// Import dependencies
import { Schema, Document, Model, model } from 'mongoose';
import { compareSync } from 'bcrypt';

// Import interface
import { IUser } from '../interfaces';

// Create user schema
const UserSchema: Schema = new Schema({
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
UserSchema.methods.comparePassword = (bodyPassword: string, userPassword: string): boolean => {
  return compareSync(bodyPassword, userPassword);
};

interface IUserModel extends IUser, Document {
  comparePassword(): string;
}

// Course type model
const User: Model = model<IUserModel>('User', UserSchema);

// Export
export { User };
