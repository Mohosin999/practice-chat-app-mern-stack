import { markChatAsReadService } from "../../../../lib/chat";

export const markChatAsRead = async (req: any, res: any) => {
  try {
    const { chatId } = req.params;
    const userId = req.user?.id;

    await markChatAsReadService(chatId, userId);

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message || "Failed to mark chat as read",
    });
  }
};
