const { User, validateUser, validateUserEdit } = require('../model/user');
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const winston = require('winston')
const config = require("../config.json");


//user details functions....
const doAddUser = async (req, res, next) => {
    try {
        let data = req.body;
        const { error } = await validateUser(data);

        //console.log(data)

        if (error) {

            res.status(400).json({data: error.details[0].message})
            
        }
         let existingName = await User.findOne({ name: data.name})
         if (existingName) {
            const error = config.error;
            error.message = 'Name Already exists.'
            return res.status(400).send(error) 
         }

         let existingEmail = await User.findOne({ email: data.email})
         if (existingEmail) {
            const error = config.error;
            error.message = 'Email Already exists.'
            return res.status(400).send(error) 
         }

         let existingPhone = await User.findOne({ phone: data.phone})
         if (existingPhone) {
            const error = config.error;
            error.message = 'Phone Number Already Exists.'
            return res.status(400).send(error) 
         }
        //console.log(data);
       
        let schema = new User(data)
        await schema.save()
        //console.log(schema);
        const success = config.success;
        success.data = schema
        res.status(200).send(success)

    } catch (er) {
        const error = config.error;
        error.message = 'Something Occured';
        res.status(400).send(error)
    }

}


//get user details
const doGetUser = async (req, res, next) => {
    try {
        //get user details
        let userData = await User.find({}).lean()
       
        let success = config.success;
        success.data = userData;
       
        res.status(200).send(success)

    } catch (err) {
        const error = config.error;
        res.status(400).send(error) 
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

        userData.password = undefined;
        console.log('data',userData);

        const success = config.success;
        success.data = userData
        res.status(200).send(success)

    } catch (er) {
        const error = config.error;
        res.status(401).send(error)
        }
    
    
}


const doEditUser = async (req, res, next) => {
    try {

        let data = req.body;
        console.log(data);
		const { error } = await validateUserEdit(data);


        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        let existingUser = await User.findOne({_id: data._id}) 
        
        if (!existingUser) {
            const error = config.error;
            error.message = 'Invalid User..'
            return res.status(400).send(error) 
            
        }
        //update user
        let updatedUser = await User.updateOne({_id: data._id},data)
         const success = config.success;
         success.data = updatedUser;
         return res.status(200).send(success)

    } catch (err) {
        const error = config.error;
        return res.status(400).send(error) 
    }
    
    
}
//dele
const doDeleteUser = async (req, res, next) => {
    try {
        let id = req.params.id
        let existingUser = await User.findOne({_id: id}) 

        if (!existingUser) {
            const error = config.error;
            error.message = 'Invalid User..'
             res.status(400).send(error)
        }
        //delete user
        await User.deleteOne({_id: id})
        const success = config.success;
        success.message = 'User Details Deleted..'
        suc.data = undefined;
        res.status(200).send(success)

    } catch (err) {
      const error = config.error;
      res.status(400).send(error)
    }
    
    
}

//sign in user
const doLogin = async(req, res, next) => {
    try {
        let data = req.body;
        console.log(data);
        console.log(data.isAdmin);
        //check if existing phone
        let existingUser = await User.findOne({phone: data.phone})
        //console.log(existingUser);
        let existingPassword = await User.findOne({password: data.password})
        let user = existingUser;
        user.password = undefined;
        
        
        if (existingUser && existingPassword) {
            
                let refershToken = jwt.sign({
                    data: user,
                }, 'refreshsecret',{ expiresIn: '7d'})
    
                ///token
                let token = jwt.sign({
                    data: user,
                  }, 'secret', { expiresIn: '1h' });

                  const success = config.success;
                  success.data = { user, token, refershToken}
                  return res.status(200).send(success)
              
        } else {
            const error = config.error;
            error.message = 'Unauthorised User..'
            return res.status(200).send(error)
        }
        
    } catch (err) {
        const error = config.error;
        return res.status(400).send(error)
    }
}

const refreshTokenUser = (req, res) => {
    try {
      let refresh_token = req.headers['x-auth-token'];

      if (!refresh_token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided'})
      }

      let decoded = jwt.verify(refresh_token,'secret');

      if (!decoded) {
        return res.status(400).json({ message: 'Invalid Token'})
      }

       req.user = decoded
       let token = jwt.sign({
       data: req.user
      },'secret',{
        expiresIn: '1h'
      })

      if (!token) {
         return res.status(401).json({ message:'No Token Provided..'})
      }

    } catch (error) {
        return res.status(400).json({ message:'Sorry. Something Went Wrong..'})
    }
}

module.exports = {
    doAddUser,
    doGetUser,
    doGetOne,
    doEditUser,
    doDeleteUser,
    doLogin,
    refreshTokenUser
   
}