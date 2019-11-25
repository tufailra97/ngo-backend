import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connect = mongodb.connect(process.env.DATABASE_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default connect;
