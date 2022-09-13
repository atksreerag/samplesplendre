const mongoose = require('mongoose')
const Joi = require('joi');
const { string } = require('joi');
const bcrypt = require('bcrypt')
SALT_WORK_FACTOR = 10;

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
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    
    
})
/*userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});*/
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
