/*const { User, validateUser, validateUserEdit } = require('../model/user');
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const winston = require('winston')
//user details functions....
const doAddUser = async (req, res, next) => {
    try {
        let data = req.body;
        const { error } = await validateUser(data);

        console.log(data)

        if (error) {
            res.status(400).json({data: error.details[0].message})
            //return resolve({statusCode: 400, status: false, message: '', data: error.details[0].message})
        }
        //console.log(data);
        
        let schema = new User(data)
        await schema.save()
        console.log(schema);
        res.status(200).json({ message: 'successfully inserted' })
    } catch (error) {
        next(error)
    }
}
//get user details
const doGetUser = async (req, res, next) => {
    try {
       
        //get user details
        let userData = await User.find({}).lean()
        //console.log(userData);
        winston.info('winston print',userData)
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
        userData.password = undefined;
        console.log('data',userData);
        res.status(200).json(userData)
    } catch (error) {
        next(error)
        }
    
    
}


const doEditUser = async (req, res, next) => {
    try {
        let data = req.body;
        console.log(data);
		const { error } = await validateUserEdit(data);


        if (error) {
            return res.status(400).json({message: error.details[0].message})
            //return resolve({statusCode: 400, status: false, message: '', data: error.details[0].message})
        }
        let existingUser = await User.findOne({_id: data._id}) 
        
        if (!existingUser) {
            res.status(400).json({ message: 'Invalid User...'})
        }
        //update user
        let updatedUser = await User.updateOne({_id: data._id},data)
        console.log('updated',updatedUser);

        res.status(200).json({ message: 'user details updated'})
    } catch (error) {
        console.log('errror is..');
        next(error)
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
        console.log(data);
        console.log(data.isAdmin);
        //check if existing phone
        let existingUser = await User.findOne({phone: data.phone})
        //console.log(existingUser);
        let existingPassword = await User.findOne({password: data.password})
        let user = existingUser;
        user.password = undefined;
        let isAdmin = data.isAdmin
        
        if (existingUser && existingPassword) {
            if (isAdmin === true) {
                let refershToken = jwt.sign({
                    data: user,
                }, 'refreshsecret',{ expiresIn: '7d'})
    
                ///token
                let token = jwt.sign({
                    data: user,
                  }, 'secret', { expiresIn: '1d' });
    
                  res.status(200).json({message:'admin login successful..',data, token, refershToken})
                 
                //console.log('admin logged');
            }
            //creating refresh token
            let refershToken = jwt.sign({
                data: user,
            }, 'refreshsecret',{ expiresIn: '7d'})

            ///token
            let token = jwt.sign({
                data: user
              }, 'secret', { expiresIn: '1d' });
              res.status(200).json({ message:'user logged successful',user, token, refershToken})
              //console.log(token);
            //console.log('user logged');
        }else{
            res.status(400).json({message: 'wrong credentials..'})
        }
        
    } catch (error) {
        next(error)
    }
}

//auth middleware...//
const protect = async(req, res, next) => {
    try {
        //token
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            let token = bearerToken;
            if(!token){
                res.status(400).json({message: 'error,Token was not provided'})
            }
            //console.log(token);
            const decoded = jwt.verify(token,'secret')
            console.log('my:=',token);
            next()
         
        }
        // //check refresh nd token
        // if (isVerifeid) {
        //     next()
        //    } else {
        //     console.log('err');
        //    }
        //    res.status(400).json({ message:'jdk'})
    } catch (error) {
        res.status(401).json({ message: 'jwt token expired'})
        console.log('hdh',error);
    }
}

//refersh toekm
const doRefreshToken = async (req, res, next) => {
    try {
       
         //refreshToken
         const bearerHeaderRefresh = req.headers['authorization'];
         if (bearerHeaderRefresh) {
             const bearerRefresh = bearerHeaderRefresh.split(' ')
             const bearerRefershToken = bearerRefresh[1]
             let refreshToken = bearerRefershToken;
             if(!refreshToken){
                 res.status(400).json({message: 'error,Bearer-Token was not provided'})
             }
             let isVerifeidRefresh = jwt.verify(refreshToken,'refreshsecret')
             if (!isVerifeidRefresh) {
                res.status(400).json({ message: 'refresh token expired'})
             }
            let token = jwt.sign({
                data: 'user'
              }, 'secret', { expiresIn: '1h' });

              res.status(200).json({ token })
         }
    } catch (error) {
        console.log(error);
    }
}

//admin middelware
const adminProtect = async (req, res, next) => {
    try {
        console.log('startingg..');
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            let token = bearerToken;
            if(!token){
                res.status(400).json({message: 'error,Token was not provided'})
            }
            console.log('token is',token);
            var decoded = jwt.verify(token,'secret')
            //console.log('decodeduser',decoded.data.isAdmin);
            if (decoded.data.isAdmin) {
                console.log('is admin');
                next()
            } else {
                return res.status(400).json({ message: "Error:Unauthorised...."})
            }
            
        }
    } catch (error) {
        console.log('err');
        return res.status(400).json({ message: "Sorry, Something went wrong.."})
        
    }
}

module.exports = {
    protect,
    adminProtect,
    doAddUser,
    doGetUser,
    doGetOne,
    doEditUser,
    doDeleteUser,
    doLogin,
    doRefreshToken
   
}*/