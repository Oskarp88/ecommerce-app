import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//Protected Routes token base
exports.requireSignIn = async (req, res, next) => {
    try {
      const decode = JWT.verify(req.headers.authorization, process.env.SECRETA_JWT);
      req.user = decode;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        success: false,
        message: 'Unauthorized — Invalid token'
      });
    }
  };

//admin access
exports.isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(403).json({
          success: false,
          message: 'Access denied — Admins only'
        });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        success: false,
        message: 'Error in admin middleware',
        error
      });
    }
  };