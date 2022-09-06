const mongoose = require('mongoose')
const Joi = require('joi');

const userSchema = mongoose.Schema({
    name : {
        type : String
    },
    age : {
        type : Number
    },
    email : {
        type : String
    },
    phone : {
        type : Number
    },
    
    
})
exports.User = mongoose.model('user', userSchema);

//joi
exports.validateUser = async (data) => {
    const Schema = Joi.object({
        name : Joi.string().required(),
        age: Joi.number().required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        phone: Joi.number().required(),   
        
    })
    return Schema.validate(data)


};
