import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import Database from './db';
import Auth from './routes/auth';

// initialize dotev
dotenv.config();

// get the port
const PORT: number = 8080 | parseInt(process.env.PORT!);

// initialize expres
const app: Application = express();

// apply middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongo database
new Database().connect();

// root folder
app.get('/', (request: Request, response: Response) => {
  response.send('RUNNING');
});

// define routes

app.use('/v1/user', Auth);

// run server
app.listen(PORT);
