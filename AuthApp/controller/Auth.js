const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../model/User");
require("dotenv").config();

exports.signup = async (req,res) => {
    try{

        const {name,email,password,password2} = req.body;
    
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'user already exist with this email id'
            });
        }

        if(password!==password2){
            return res.status(400).json({
                success:false,
                message:'password is not same as above'
            });
        }

        let hashedpassword;
        try{
            hashedpassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'Error in hashing password'
            });
        }

        const user = await User.create({name,email,password:hashedpassword});
        console.log(user);

        return res.json({
            success:true,
            body:user,
            message:'user created successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.login = async (req,res) => {

    try{
            // fetch data from body
        const {email,password} = req.body;

        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details"
            })
        }

        // find user
        const user = await User.findOne({email});

        //checking existing user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not registered"
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            // role:user.role,
        };

        //verify password & create JWT(JSON web token) token
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
            console.log(token);
            
            const user1 = user.toObject();
            user1.token = token;
            user1.password = null;

            const options = {
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            // res.cookie("token",token,options).status(200).json({
            //     success:true,
            //     token,
            //     user1,
            //     message:'user logged in successfully'
            // })
            res.status(200).json({
                success:true,
                token,
                user1,
                message:'user logged in successfully'
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"please enter correct password"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }    
}
