const mongoose = require('mongoose')
const Joi = require('joi');
const { string, required } = require('joi');
const bcrypt = require('bcrypt')
SALT_WORK_FACTOR = 10;
Joi.objectId = require('joi-objectid')(Joi)

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    phone : {
        type : Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    
    
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
        password : Joi.string().required(),
        isAdmin: Joi.boolean()
        
    })
    return Schema.validate(data)


};
exports.validateUserEdit = async (data) => {
    const Schema = Joi.object({
        _id: Joi.objectId(),
        name : Joi.string().required(),
        age: Joi.number().required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        phone: Joi.number().required(),  
        password : Joi.string().required(),
        isAdmin: Joi.boolean()
        
    })
    return Schema.validate(data)


};