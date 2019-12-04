import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

interface IVerify extends Request {
  user?: string | Object;
}

// TODO: implement express session
// TODO: implement refresh token
class Session {
  verifyToken = (request: IVerify, response: Response, next: NextFunction) => {
    const token = request.header('authorization')!.split(' ')[1];

    console.log('token ---> ', token);

    if (!token) {
      return response.status(401).json({ message: 'Access Denied' });
    }

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
