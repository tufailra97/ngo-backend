import { Router, Response, Request } from 'express';
import { User as UserSchema, User } from '../schema';
import { AuthValidation } from '../services';
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

  if (error) {
    response.status(400).json({
      errors: error.details[0].message
    });
  }

  const userExist = await UserSchema.findOne({ email: email });

  // if user email exist stop validation
  if (userExist) {
    response.status(400).json({
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

export default router;
