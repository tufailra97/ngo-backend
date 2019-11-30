import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

interface IVerify extends Request {
  user?: string | Object;
}

// TODO: implement express session
class Session {
  verifyToken = (request: IVerify, response: Response, next: NextFunction) => {
    const token = request.header('token');

    if (!token) return response.status(401).json({ message: 'Unauthorized' });

    try {
      const _verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      request.user = _verifiedToken;
      next();
    } catch (error) {
      response.status(401).json({
        message: 'Invalid token'
      });
    }
  };
}

export default Session;
