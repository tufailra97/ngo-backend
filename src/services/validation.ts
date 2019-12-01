import Joi, { ValidationResult } from '@hapi/joi';

class Validation {
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

  favouriteAddValidation = (data: {
    item_id: number;
    type: string;
    title: string;
    poster_path: string;
  }): ValidationResult => {
    const validationSchema = Joi.object({
      item_id: Joi.number().required(),
      type: Joi.string().required(),
      title: Joi.string().required(),
      poster_path: Joi.string()
    });
    return validationSchema.validate(data);
  };

  favouriteRemoveValidation = (data: { item_id: number }): ValidationResult => {
    const validationSchema = Joi.object({
      item_id: Joi.number().required()
    });
    return validationSchema.validate(data);
  };
}

export default Validation;
