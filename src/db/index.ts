import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private readonly DB_URI: string = process.env.DATABASE_URL!;

  connect = () => {
    mongoose.connect(
      this.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      err => {
        if (err) {
          throw new Error(err.message);
        } else {
          console.log('Successfully connected to the database');
        }
      }
    );
  };
}

export default Database;
