import { NextFunction, Request, Response } from "express";
import { authenticationError } from "../utils/error";
import { verifyAccessToken } from "../lib/token";
import { findUserByEmail } from "../lib/user";

interface AccessTokenPayload {
  id: string;
  name: string;
  email: string;
}

export const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) throw authenticationError("No token found");

  try {
    const decoded = verifyAccessToken({ token }) as AccessTokenPayload;
    const user = await findUserByEmail(decoded.email);

    if (!user) throw authenticationError("User not found");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(authenticationError());
  }
};
