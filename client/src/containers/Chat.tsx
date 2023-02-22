import { createRef, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { AppDispatch } from "../app/store";
import ChatContent from "../components/ChatContent";
import { getAllRoom, clearRoom, selectRoom } from "../features/rooms/roomSlice";
import { Post } from "../features/rooms/room.interface";
import useUser from "../hooks/useUser";
import useOutsideToClose from "../hooks/useOutsideToClose";
import Emoji from "../assets/Emoji.svg";
import Close from "../assets/Close.svg";
import style from "../styles/Chat.module.css";

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector(selectRoom);

  const { user } = useUser();
  const params = useParams();

  const emojisRef = createRef<HTMLDivElement>();
  const { open, setOpen } = useOutsideToClose(emojisRef);

  const [roomID, setRoomID] = useState<string>(params.roomID || "");
  const [socket, setSocket] = useState<any | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Post[]>([]);

  const joinRoom = (roomID: string) => {
    socket!.emit("joinRoom", roomID);
  };

  const leaveRoom = (roomID: string) => {
    socket!.emit("leaveRoom", roomID);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket!.emit("messageRoom", {
      room: roomID,
      text: message,
      sender: user?._id,
    });
    setMessage("");
  };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_SOCKET_URL);
    newSocket.on("connect", () => {
      setSocket(newSocket);
      dispatch(getAllRoom(params.roomID || ""));
    });
    return () => {
      newSocket.disconnect();
      setMessages([]);
      dispatch(clearRoom());
    };
  }, []);

  useEffect(() => {
    if (socket) {
      if (room) {
        setMessages(room.posts);

        joinRoom(roomID);
      } else {
        leaveRoom(roomID);
      }
    }
  }, [room]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("message", (payload: Post) => {
      setMessages((prevMessages) => [...prevMessages, payload]);
    });
  }, [socket]);

  useEffect(() => {
    dispatch(clearRoom());
    setRoomID(params.roomID || "");
    dispatch(getAllRoom(params.roomID || ""));
  }, [params.roomID]);

  useEffect(() => {
    return () => {
      dispatch(clearRoom());
    };
  }, []);

  if (!room) {
    return (
      <div className={style.chat_cont}>
        <h1>Wait while fetching chat</h1>
      </div>
    );
  } else
    return (
      <div className={style.chat_cont}>
        <div className={style.chat_header_data_cont}>
          <NavLink to="" className={style.chat_rooname}>
            {room.roomname}
          </NavLink>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={style.chat_body_cont}>
          {messages.map((post: Post, index: number) => {
            return (
              <ChatContent
                index={index}
                sender_id={post.sender._id}
                sender_name={post.sender.name}
                createdAt={post.createdAt}
                text={post.text}
                key={index + 1}
              />
            );
          })}
        </div>
        <form
          onSubmit={(e) => sendMessage(e)}
          className={style.chat_input_message}
        >
          <input
            type="text"
            placeholder="Type something..."
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            className={style.message_input}
          />
          <img
            src={Emoji}
            alt="Emoji picker"
            className={style.message_emoji_picker}
            onClick={() => setOpen(!open)}
          />
          {open ? (
            <div className={style.message_emojis} ref={emojisRef}>
              <img
                src={Close}
                className={style.emojis_close}
                onClick={() => setOpen(!open)}
              />
              <Picker
                data={data}
                onEmojiSelect={(e: any) =>
                  setMessage((prev) => prev + e.native)
                }
              />
            </div>
          ) : null}
        </form>
      </div>
    );
};

export default Chat;
