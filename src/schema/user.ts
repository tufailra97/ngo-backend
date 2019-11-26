import mongoose, { Schema, Document } from 'mongoose';

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

export default mongoose.model('User', User);
