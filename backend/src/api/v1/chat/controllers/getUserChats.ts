import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { getUserChatsService } from "../../../../lib/chat";

export const getUserChats = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    console.log("getUserChats called with userId:", userId);
    const chats = await getUserChatsService(userId);

    return res.status(200).json({
      message: "User chats retrieved successfully",
      chats,
    });
  }
);
