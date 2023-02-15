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

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector(selectRoom);

  const params = useParams();

  const [message, setMessage] = useState<string>("");
  const emojisRef = createRef<HTMLDivElement>();
  const { open, setOpen } = useOutsideToClose(emojisRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  useEffect(() => {
    dispatch(getAllRoom(params.roomID ? params.roomID : ""));
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
        <div className={style.chat_body_cont}>
          {room.posts.map((post: Post, index: number) => {
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
