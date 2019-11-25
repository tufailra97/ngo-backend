import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import db from './db';

dotenv.config();

console.log(dotenv.config());

const PORT: number = 8080;

const app: Application = express();

db.then(() => {
  console.log('connected to the databse');
});

app.get('/', (reques: Request, response: Response) => {
  response.send('RUNNING');
});

app.listen(PORT);
