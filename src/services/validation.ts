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

  /**
   * validate item to add
   * @returns ValidationResult
   */
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
  /**
   * validate item to remove
   * @returns ValidationResult
   */
  favouriteRemoveValidation = (data: {
    items_id: Array<number>;
  }): ValidationResult => {
    const validationSchema = Joi.object({
      items_id: Joi.array().items(Joi.number())
    });
    return validationSchema.validate(data);
  };
}

export default Validation;
