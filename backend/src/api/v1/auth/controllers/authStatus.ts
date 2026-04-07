import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";

export const authStatus = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Authenticated User",
    user: req.user,
  });
});
