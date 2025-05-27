import bcrypt from "bcryptjs";
import User from "../models/user";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (data: any) => {
  const user = await User.create(data);
  const token = generateToken(
    JSON.stringify({ id: user._id, role: user.role })
  );
  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(
    JSON.stringify({ id: user._id, role: user.role })
  );
  return { user, token };
};
