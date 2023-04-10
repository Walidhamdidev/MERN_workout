import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];

  try {
    const { id } = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: id }).select("_id");
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request is not authorized." });
  }
  next();
};

export default requireAuth;
