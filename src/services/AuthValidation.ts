import Joi, { ValidationResult } from '@hapi/joi';

class AuthValidation {
  /**
   * Validate users input
   * @return ValidationResult
   */
  registerValidation = (data: {
    username: string;
    email: string;
    password: string;
  }): ValidationResult => {
    const validationSchema = Joi.object({
      password: Joi.string()
        .required()
        .min(8),
      email: Joi.string()
        .email()
        .required(),
      username: Joi.string()
        .required()
        .min(3)
    });

    return validationSchema.validate(data);
  };

  /**
   * Validate user login input
   * @return ValidationResult
   */
  loginValidation = (data: {
    email: string;
    password: string;
  }): ValidationResult => {
    const validationSchema = Joi.object({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8)
    });

    return validationSchema.validate(data);
  };
}

export default AuthValidation;
