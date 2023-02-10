import { NavLink } from "react-router-dom";
import style from "../styles/Chat.module.css";

const Chat = () => {
  return (
    <div className={style.chat_cont}>
      <div className={style.chat_header_data_cont}>
        <NavLink to="" className={style.chat_rooname}>
          Roomname
        </NavLink>
      </div>
      <div>
        <div>
          <img alt={`username image`} />
          <div>
            <div>
              <p>Others name</p>
              <p>11:01 AM</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati aperiam nesciunt aspernatur quis. Numquam perferendis
              architecto consectetur quia? Asperiores pariatur nostrum saepe
              doloremque officiis, nam magni. Adipisci fuga minus sequi.
            </p>
          </div>
        </div>
        <div>
          <img alt={`username image`} />
          <div>
            <div>
              <p>My name</p>
              <p>11:04 AM</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati aperiam nesciunt aspernatur quis. Numquam perferendis
              architecto consectetur quia? Asperiores pariatur nostrum saepe
              doloremque officiis, nam magni. Adipisci fuga minus sequi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
