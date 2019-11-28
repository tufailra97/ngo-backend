import mongoose, { Schema, Document, HookNextFunction } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const User = new Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  }
});

export default mongoose.model<IUser>('User', User);
