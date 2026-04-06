// import { getOtherUserAndGroup } from "@/lib/helper";
// import type { ChatType } from "@/types/chat";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import AvatarWithBadge from "../avatar-with-badge";

// interface Props {
//   chat: ChatType;
//   currentUserId: string | null;
//   isTyping?: boolean;
//   typingUsers?: string[];
// }
// const ChatHeader = ({
//   chat,
//   currentUserId,
//   isTyping,
//   typingUsers = [],
// }: Props) => {
//   const navigate = useNavigate();
//   const { name, subheading, avatar, isOnline, isGroup } = getOtherUserAndGroup(
//     chat,
//     currentUserId,
//   );

//   // Get typing users names (for group chats)
//   const getTypingText = () => {
//     if (!isTyping) return null;

//     if (isGroup && typingUsers.length > 0) {
//       // For group chats, you'd need to map userIds to names
//       // For now, show a generic message
//       return typingUsers.length === 1
//         ? "is typing..."
//         : `${typingUsers.length} people are typing...`;
//     }

//     return "is typing...";
//   };

//   return (
//     <div
//       className="sticky top-0
//     flex items-center gap-5 border-b border-border
//     bg-card px-2 z-50
//     "
//     >
//       {/* div 1 */}
//       <div className="h-14 px-4 flex items-center">
//         <div>
//           <ArrowLeft
//             className="w-5 h-5 inline-block lg:hidden
//           text-muted-foreground cursor-pointer
//           mr-2
//           "
//             onClick={() => navigate("/")}
//           />
//         </div>
//         <AvatarWithBadge
//           name={name}
//           src={avatar}
//           isGroup={isGroup}
//           isOnline={isOnline}
//         />
//         <div className="ml-2">
//           <h5 className="font-semibold">{name}</h5>
//           <p
//             className={`text-xs ${
//               isTyping
//                 ? "text-green-500 dark:text-green-400"
//                 : isOnline
//                   ? "text-green-500"
//                   : "text-muted-foreground"
//             }`}
//           >
//             {isTyping ? (
//               <span className="text-xs flex items-center gap-1">
//                 {getTypingText()}
//                 {/* <span className="inline-flex gap-0.5 ml-0.5">
//                   <span
//                     className="w-1 h-1 bg-current rounded-full animate-bounce"
//                     style={{ animationDelay: "0ms" }}
//                   />
//                   <span
//                     className="w-1 h-1 bg-current rounded-full animate-bounce"
//                     style={{ animationDelay: "150ms" }}
//                   />
//                   <span
//                     className="w-1 h-1 bg-current rounded-full animate-bounce"
//                     style={{ animationDelay: "300ms" }}
//                   />
//                 </span> */}
//               </span>
//             ) : (
//               subheading
//             )}
//           </p>
//         </div>
//       </div>

//       {/* div 2 */}
//       <div>
//         <div
//           className={`flex-1
//             text-center
//             py-4 h-full
//             border-b-2
//             border-primary
//             font-medium
//             text-primary`}
//         >
//           Chat
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;

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
      className="sticky top-0 z-50 flex items-center justify-between
      border-b border-border bg-card px-2"
    >
      {/* ✅ LEFT SIDE (FIXED WIDTH) */}
      <div className="flex items-center gap-2 h-14 px-4 min-w-[300px] max-w-[300px]">
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

        <div className="ml-1 overflow-hidden">
          <h5 className="font-semibold truncate">{name}</h5>

          {/* ✅ FIXED HEIGHT + OVERLAY TEXT (NO SHIFT EVER) */}
          <p className="text-xs relative h-[16px] overflow-hidden">
            {/* Typing text */}
            <span
              className={`absolute left-0 top-0 whitespace-nowrap transition-opacity duration-200 ${
                isTyping
                  ? "opacity-100 text-green-500 dark:text-green-400"
                  : "opacity-0"
              }`}
            >
              {getTypingText()}
            </span>

            {/* Normal subheading */}
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

      {/* ✅ RIGHT SIDE (FULLY STABLE) */}
      <div className="flex-1 flex justify-center">
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
