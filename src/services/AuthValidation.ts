import Joi, { ValidationResult } from '@hapi/joi';

class AuthValidation {
  /**
   * Validate users input
   * @return validation results
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
}

export default AuthValidation;
