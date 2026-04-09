import { getOtherUserAndGroup } from "@/lib/helper";
import type { ChatType } from "@/types/chat";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AvatarWithBadge from "../avatar-with-badge";

interface Props {
  chat: ChatType;
  currentUserId: string | null;
  isTyping?: boolean;
  typingUsers?: string[];
}

const ChatHeader = ({
  chat,
  currentUserId,
  isTyping,
  typingUsers = [],
}: Props) => {
  const navigate = useNavigate();

  const { name, subheading, avatar, isOnline, isGroup } = getOtherUserAndGroup(
    chat,
    currentUserId,
  );

  const getTypingText = () => {
    if (!isTyping) return "";

    if (isGroup && typingUsers.length > 0) {
      return typingUsers.length === 1
        ? "is typing"
        : `${typingUsers.length} people are typing`;
    }

    return "is typing";
  };

  return (
    <div
      className="sticky top-0 z-50 flex items-center
      border-b border-border bg-card px-2"
    >
      {/* ✅ LEFT SIDE (DYNAMIC WIDTH) */}
      <div className="flex items-center gap-2 h-14 px-2 md:px-4">
        <ArrowLeft
          className="w-5 h-5 lg:hidden text-muted-foreground cursor-pointer"
          onClick={() => navigate("/")}
        />

        <AvatarWithBadge
          name={name}
          src={avatar}
          isGroup={isGroup}
          isOnline={isOnline}
        />

        <div className="ml-1">
          <h5 className="font-semibold whitespace-nowrap">{name}</h5>

          {/* ✅ NO SHIFT TEXT */}
          <p className="text-xs relative h-[16px]">
            <span
              className={`absolute left-0 top-0 whitespace-nowrap transition-opacity duration-200 ${
                isTyping
                  ? "opacity-100 text-green-500 dark:text-green-400"
                  : "opacity-0"
              }`}
            >
              {getTypingText()}
            </span>

            <span
              className={`absolute left-0 top-0 whitespace-nowrap transition-opacity duration-200 ${
                isTyping
                  ? "opacity-0"
                  : isOnline
                    ? "opacity-100 text-green-500"
                    : "opacity-100 text-muted-foreground"
              }`}
            >
              {subheading}
            </span>
          </p>
        </div>
      </div>

      {/* ✅ RIGHT SIDE (CLOSE TO LEFT) */}
      <div className="ml-6">
        <div
          className="py-4 border-b-2 border-primary
          font-medium text-primary text-center"
        >
          Chat
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
