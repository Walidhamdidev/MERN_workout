import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

const createToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default {
  userLogin,
  userSignup,
};
