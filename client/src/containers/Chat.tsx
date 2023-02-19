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
import useOutsideToClose from "../hooks/useOutsideToClose";
import Emoji from "../assets/Emoji.svg";
import Close from "../assets/Close.svg";
import style from "../styles/Chat.module.css";
import useUser from "../hooks/useUser";

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useUser();

  const params = useParams();

  const [room, setRoom] = useState<any>();

  const [socket, setSocket] = useState<any | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Post[]>([]);

  const emojisRef = createRef<HTMLDivElement>();
  const { open, setOpen } = useOutsideToClose(emojisRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("messageRoom", {
      room: params.roomID,
      text: message,
      sender: user?._id,
    });
    setMessage("");
  };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_SOCKET_URL);
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });

    newSocket.emit("joinRoom", params.roomID);

    newSocket.emit("room", params.roomID);

    newSocket.on("room", (room: any) => {
      setRoom(room);
      setMessages(room.posts);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (payload: any) => {
      setMessages([...messages, payload]);
    });
  }, [socket]);

  console.log(messages);

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
          onSubmit={(e) => handleSubmit(e)}
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
