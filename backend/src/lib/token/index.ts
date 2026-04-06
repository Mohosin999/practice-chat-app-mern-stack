import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { serverError } from "../../utils/error";

interface AccessTokenProps {
  payload: { id: string; name: string; email: string };
  algorithm?: jwt.Algorithm;
  secret?: string;
  expiresIn?: SignOptions["expiresIn"];
}

interface VarifyAccessTokenProps {
  token: string;
  algorithm?: jwt.Algorithm;
  secret?: string;
}

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;
type Cookie = {
  res: Response;
  userId: string;
};

export const setJwtAuthCookie = ({ res, userId }: Cookie) => {
  const payload = { userId };
  const expiresIn = process.env.JWT_EXPIRES_IN as Time;
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(payload, secret, {
    audience: ["user"],
    expiresIn: expiresIn || "7d",
  });

  return res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export const clearJwtAuthCookie = (res: Response) =>
  res.clearCookie("accessToken", { path: "/" });

/**
 * --------------------------------------------
 * Generate access token
 * --------------------------------------------
 */

export const generateAccessToken = ({
  payload,
  algorithm = "HS256",
  secret = process.env.JWT_SECRET!,
  expiresIn = "30m",
}: AccessTokenProps) => {
  try {
    return jwt.sign(payload, secret, { algorithm, expiresIn });
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

//   try {
//     return jwt.sign(userId, process.env.JWT_SECRET!);
//   } catch (error) {
//     console.log("[JWT]", error);
//     throw serverError();
//   }
// };

/**
 * --------------------------------------------
 * Verify access token
 * --------------------------------------------
 */
export const verifyAccessToken = ({
  token,
  algorithm = "HS256",
  secret = process.env.JWT_SECRET!,
}: VarifyAccessTokenProps) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};
