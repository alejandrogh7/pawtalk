import { useState } from "react";
import { NavLink } from "react-router-dom";
import Emoji from "../assets/Emoji.svg";
import style from "../styles/Chat.module.css";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [showPicket, setShowPicker] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log();
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  return (
    <div className={style.chat_cont}>
      <div className={style.chat_header_data_cont}>
        <NavLink to="" className={style.chat_rooname}>
          Roomname
        </NavLink>
      </div>
      <div className={style.chat_body_cont}>
        <div className={`${style.chat_user_body} ${style.chat_other_body}`}>
          <img
            src="https://wallpapers.com/images/featured/7nffbkza5h89jssn.jpg"
            alt={`username image`}
            className={style.user_image}
          />
          <div className={style.user_body_data_cont}>
            <div className={`${style.user_data} ${style.other_data}`}>
              <p className={style.user_name}>Others name</p>
              <p className={style.user_date}>11:01 AM</p>
            </div>
            <div className={`${style.user_message} ${style.other_message}`}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati aperiam nesciunt aspernatur quis. Numquam perferendis
              architecto consectetur quia? Asperiores pariatur nostrum saepe
              doloremque officiis, nam magni. Adipisci fuga minus sequi.
            </div>
          </div>
        </div>
        <div className={`${style.chat_user_body} ${style.chat_my_body}`}>
          <img
            src="https://wallpapers.com/images/featured/7nffbkza5h89jssn.jpg"
            alt={`username image`}
            className={style.user_image}
          />
          <div className={style.user_body_data_cont}>
            <div className={`${style.user_data} ${style.my_data}`}>
              <p className={style.user_name}>My name</p>
              <p className={style.user_date}>11:04 AM</p>
            </div>
            <div className={`${style.user_message} ${style.my_message}`}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati aperiam nesciunt aspernatur quis. Numquam perferendis
              architecto consectetur quia? Asperiores pariatur nostrum saepe
              doloremque officiis, nam magni. Adipisci fuga minus sequi.
            </div>
          </div>
        </div>
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
          onClick={() => setShowPicker(!showPicket)}
        />

      </form>
    </div>
  );
};

export default Chat;
