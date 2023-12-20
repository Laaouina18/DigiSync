import Joi from "joi";

/**
 * @HELPER
 * @type object
 * @desc schema that defines custom Error Messages
 *
 **/
const customErrorMessages = {
    "string.base": "The {#label} field must be a valid string.",
    "string.pattern.base": "Password cannot contain spaces",
    "string.min":
        "The {#label} field must be at least {#limit} characters long.",
    "string.max": "The {#label} field must not exceed {#limit} characters.",
    "string.email": "The email address is not valid.",
    "any.required": "The {#label} field is required.",
    "string.empty": "the {#label} Field cannot be empty",
    "number.base": "The {#label} field must be a valid id."
};

/**
 * @HELPER
 * @type object
 * @desc schemas for validating the request body when creating and updating
 *
 **/

/**
 * @POST
 */
const appartementSchema = Joi.object({
    numero: Joi.string().required().messages(customErrorMessages),
    etage: Joi.string().required().messages(customErrorMessages),
    client: Joi.string().required().messages(customErrorMessages),
	address: Joi.string().messages(customErrorMessages),
	prix: Joi.string().messages(customErrorMessages),
	immeuble: Joi.string().messages(customErrorMessages),
	syndic:Joi.string().required()

});

/**
 *@Syndic
 */

const SyndicShema=Joi.object(
	{
		firstName:Joi.string().required().messages(customErrorMessages),
		lastName:Joi.string().required().messages(customErrorMessages),
		email:Joi.string().required().messages(customErrorMessages),
		immeuble:Joi.string().required().messages(customErrorMessages),
		phone: Joi.string().messages(customErrorMessages),
		password:Joi.string().required().messages(customErrorMessages)
	
	}
)
/**
 *@Payement
 */

 const PayementShema=Joi.object(
	{
		date:Joi.object().required(),
	   appartement:Joi.object().required()
	
	}
)
/**
 * @HELPER
 * @type function
 * @params schema , req.body object
 * @desc function validate sheama either return message or null , takes two parameter schema and req.body object
 *
 **/

const validator = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        throw new Error(errors);
    }
};

export { appartementSchema,SyndicShema, validator ,PayementShema};