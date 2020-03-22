//VALIDATION
const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });    

    //Validate
    const validation = schema.validate(data);
    return validation;
}

const registerValidationCustomer = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        address: adressSchema
    });
    const validation = schema.validate(data);
    return validation;
}

const registerValidationCompany = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        description: Joi.string(),
        branche: Joi.string(),
        address: adressSchema
    });
    const validation = schema.validate(data);
    return validation;
}


const adressSchema = Joi.object().keys({
    street: Joi.string().required(),
    housenumber: Joi.string().required(),
    postcode: Joi.number().required(),
    city: Joi.string().required(),
    longitude: Joi.number(),
    latitude: Joi.number()
})


const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });    

    //Validate
    const validation = schema.validate(data);
    return validation;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerValidationCustomer = registerValidationCustomer;
module.exports.registerValidationCompany = registerValidationCompany;