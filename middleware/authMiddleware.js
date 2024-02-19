import jws from 'jsonwebtoken';
import User from '../models/User.js';

export const authGuard = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jws.verify(token, process.env.JWT_SECRET)
      req.user =  await User.findById(id).select("-password");
      next();
    } catch (error) {
      let err =  new Error("not authorized, token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized");
    error.statusCode = 401;
    next(error);
  }
}