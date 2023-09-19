import Joi from 'joi';

const envVarsSchema = Joi.object({
  REACT_APP_ALCHEMY_ID: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
