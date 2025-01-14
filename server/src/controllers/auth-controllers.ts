import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createToken } from "../lib/create-token";
import { hashPassword } from "../lib/hash-password";
import { User } from "../models/User";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, phone_number } = req.body;
    if (!name || !email || !password) {
      res.status(422).json({ message: "Missing Credentials" });
      return;
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(401).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone_number,
    }).save();

    const token = createToken(
      newUser._id,
      newUser.name,
      newUser.email,
      newUser.role
    );

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.log("signup  error:", (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ message: "Missing Credentials" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    const token = createToken(user._id, user.name, user.email, user.role);
    res.status(200).json({ token, user });
  } catch (error) {
    console.log("Login  error:", (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(res.locals._id);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.log("getMe  error:", (error as Error).message);
    res.status(402).json({ message: (error as Error).message });
  }
};
