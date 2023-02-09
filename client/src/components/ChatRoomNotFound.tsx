import { Outlet } from "react-router-dom";
import NotFound from "./NotFound";
import Rooms from "../containers/Rooms";

const ChatRoomNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
      }}
    >
      <Rooms />
      <NotFound text="Search a room to start to chat" />
      <Outlet />
    </div>
  );
};

export default ChatRoomNotFound;
