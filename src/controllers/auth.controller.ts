import { Request, Response } from "express";
import { login } from "../services/auth.service";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const { token } = await login(email, password);

    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

