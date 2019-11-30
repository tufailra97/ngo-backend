import { Router, Response, Request } from 'express';
import { User as UserSchema } from '../model';
import { AuthValidation } from '../services';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/register-user', async (request: Request, response: Response) => {
  const username: string = request.body.username;
  const password: string = request.body.password;
  const email: string = request.body.email;

  // validate user input details
  const { error } = new AuthValidation().registerValidation({
    username,
    password,
    email
  });

  // if error stop validation
  if (error) {
    return response.status(400).json({
      errors: error.details[0].message
    });
  }

  const userExist = await UserSchema.findOne({ email: email });

  // if user email exist stop validation
  if (userExist) {
    return response.status(400).json({
      message: 'This email already exist in our database'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserSchema({
    password: hashedPassword,
    email,
    username
  });

  try {
    const saveUser = await user.save();
    response.status(200).json({
      status: 200,
      message: 'User created successfully',
      userID: saveUser.id
    });
  } catch (error) {
    response.status(400).json({
      status: 400,
      message: error
    });
  }
});

router.post('/login', async (request: Request, response: Response) => {
  const email: string = request.body.email;
  const password: string = request.body.password;

  const { error } = new AuthValidation().loginValidation({
    email,
    password
  });

  // if error stop login
  if (error)
    return response.status(400).json({
      message: error.details[0].message
    });

  // get email from collection
  const user = await UserSchema.findOne({
    email: email
  });

  // if user doesn't exit stop validation
  if (!user)
    return response.status(401).json({
      message: 'Invalid email'
    });

  // validate password
  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword)
    return response.status(401).json({
      message: 'Invalid password'
    });

  const token = jwt.sign({ token: user.id }, process.env.JWT_SECRET_KEY!);

  response
    .header('token', token)
    .status(200)
    .json({ token: token, user_id: user.id });
});

export default router;
