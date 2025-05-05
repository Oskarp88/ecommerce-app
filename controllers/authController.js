
import { comparePassword, hashPasword } from '../helpers/authHelper.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken';

const userModel = require('../models/userModel');
const { hashPasword } = require('../helpers/authHelper');

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: 'Already registered, please login'
      });
    }

    // Hash password
    const hashedPassword = await hashPasword(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in registration',
      error
    });
  }
};
//Post login 

exports.loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Email is not registered'
        });
      }
  
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(200).json({
          success: false,
          message: 'Invalid password'
        });
      }
  
      // Generate JWT token
      const token = JWT.sign(
        { _id: user._id },
        process.env.SECRETA_JWT,
        { expiresIn: '7d' }
      );
  
      res.status(200).json({
        success: true,
        message: 'Login successfully',
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role
        },
        token
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error in login',
        error
      });
    }
  };

//forgo password
export const forgotPasswordController = async(req, res) =>{
   try {
        const {email, answer, newPassword} = req.body;
        if(!email){
            res.status(400).send({message: 'Email is required'});
        }
        if(!answer){
            res.status(400).send({message: 'Question is required'});
        }
        if(!newPassword){
            res.status(400).send({message: 'newPassword is required'});
        }
        //check 
        const user = await userModel.findOne({email, answer});
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email Or Answer'
            })
        }
        const hashed = await hashPasword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password: hashed});
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully'
        })
   } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Something went wrong',
        error
      })
   }
}

//test controller
export const testController = (req, res) => {
    res.status(200).send('protected Route')
}

//update profile
exports.updateProfileController = async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);  // req.user inyectado desde middleware de auth

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters'
        });
      }
      user.password = await hashPasword(password);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({buyer:req.user._id})
        .populate('products','-photo')
        .populate('buyer','name');
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: 'Error while Geting Orders',
          error
        })
    }
}

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        .populate('products','-photo')
        .populate('buyer','name')
        .sort({createdAt: '-1'});
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: 'Error while Geting Orders',
          error
        })
    }
}

export const orderStatusController = async(req, res) => {
    try {
        const {orderId} = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: 'Error while Updateing Orders',
          error
        })
    }
}