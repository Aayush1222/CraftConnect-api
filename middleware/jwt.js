import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("Access Token:", token);

  if (!token) return next(createError(401,"You are not authenticated!"))


  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403,"Token is not valid!"))
    console.log("Payload:", payload); // Debug the token payload

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next()
  });
};
