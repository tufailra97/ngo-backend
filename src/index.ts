import express, { Application, Request, Response, NextFunction } from 'express';

const PORT: number = 8080;

const app: Application = express();

app.get('/', (reques: Request, response: Response) => {
  response.send('RUNNING');
});

app.listen(PORT);
