import React from "react";
import AsideBar from "./aside-bar";
import useChatId from "@/hooks/use-chat-id";

interface Props {
  children: React.ReactNode;
}
const AppWrapper = ({ children }: Props) => {
  const chatId = useChatId();

  return (
    <div className="h-full flex">
      <aside className={`${chatId ? "hidden lg:block" : "block"}`}>
        <AsideBar />
      </aside>
      <main className={`flex-1 ${chatId ? "h-full" : "lg:pl-10 h-full"}`}>{children}</main>
    </div>
  );
};

export default AppWrapper;
