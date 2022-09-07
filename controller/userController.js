const { User, validateUser } = require('../model/user');
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//user details functions....
const doAddUser = async (req, res, next) => {
    try {
        let data = req.body;
        const { error } = await validateUser(data);

        console.log(data)

        if (error) {
            res.status(400).json({data: error})
            return resolve({statusCode: 400, status: false, message: '', data: error.details[0].message})
        }
        //console.log(data);
        
        let schema = new User(data)
        await schema.save()
        console.log(schema);
        res.status(200).json({message: 'successfully inserted'})
    } catch (error) {
		console.log("shdgahsd")
        next(error)
    }
}
//get user details
const doGetUser = async (req, res, next) => {
    try {
       
        //get user details
        let userData = await User.find({}).lean()
        console.log(userData);
        res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
    
    
}


const doGetOne = async (req, res, next) => {
    try {
        let id = req.params.id
        console.log(id);
        //get one user
        let userData = await User.findOne({
            _id: id
        }).lean()
        console.log('data',userData);
        res.status(200).json(userData)
    } catch (error) {
        next(error)
        }
    
    
}


const doEditUser =async (req, res, next) => {
    try {
        let data = req.body;
        console.log(data);
		const { error } = await validateUser(data);


        if (error) {
            res.status(400).json({data: error})
            return resolve({statusCode: 400, status: false, message: '', data: error.details[0].message})
        }
        let existingUser = await User.findOne({_id: data._id}) 
        
        if (!existingUser) {
            res.status(400).json(false)
        }
        //update user
        let updatedUser = await User.updateOne({_id: data._id},data)
        console.log('updated',updatedUser);

        res.status(200).json({data: 'user details updated'})
    } catch (error) {
        console.log('errror is..');
        next(error)
        //res.status(400).json({userData})
    }
    
    
}
//dele
const doDeleteUser = async (req, res, next) => {
    try {
        let id = req.params.id
        let existingUser = await User.findOne({_id: id}) 

        if (!existingUser) {
             res.status(400).json(false)
        }
        //delete user
        await User.deleteOne({_id: id})
        res.status(200).json({data: 'user details deleted'})

    } catch (error) {
       console.log('false');
       next(error)
    }
    
    
}

//sign in user
const doLogin = async(req, res, next) => {
    try {
        let data = req.body;
        //console.log(data);
        //check if existing phone
        let existingUser = await User.findOne({phone: data.phone})
        //console.log(existingUser);
        let existingPassword = await User.findOne({password: data.password})
        let user = existingUser;
        if (existingUser && existingPassword) {

            ///token
            let token = jwt.sign({
                data: 'dummmy'
              }, 'secret', { expiresIn: '1h' });

              res.status(200).json({user, token})
              //console.log(token);
            console.log('user logged');
        }else{
            res.status(400).json({message: 'wrong credentials..'})
        }
        //console.log('invalid');

        
        
        
    } catch (error) {
        next(error)
    }
}

//auth
const protect = async(req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            let token = bearerToken;
            if(!token){
                res.status(400).json({message: 'error,Token was not provided'})
            }
            //console.log(token);
            let isVerifeid = jwt.verify(token,'secret')
               if (isVerifeid) {
                next()
               } else {
                console.log('err');
               }
               
            
        }
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    protect,
    doAddUser,
    doGetUser,
    doGetOne,
    doEditUser,
    doDeleteUser,
    doLogin
   
}