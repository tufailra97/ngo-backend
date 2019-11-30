import mongoose, { Schema, Document, HookNextFunction } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  favourites: [
    {
      type: 'serie' | 'movie';
      id: number;
      title: string;
      poster_path: string;
    }
  ];
}

const Favourites = new Schema({
  type: String,
  id: Number,
  title: String,
  poster_path: String
});

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
  },
  favourites: [Favourites]
});

export default mongoose.model<IUser>('User', User);
