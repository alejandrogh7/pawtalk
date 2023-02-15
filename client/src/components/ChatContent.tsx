import style from "../styles/ChatContent.module.css";

interface ChatContentProps {
  sender_id: string;
  index: number;
  sender_name: string;
  createdAt: Date;
  text: string;
}

const ChatContent: React.FC<ChatContentProps> = ({
  sender_id,
  index,
  sender_name,
  createdAt,
  text,
}) => {
  if (sender_id === "1") {
    return (
      <div
        className={`${style.chat_user_body} ${style.chat_my_body}`}
        key={index}
      >
        <img
          src="https://wallpapers.com/images/featured/7nffbkza5h89jssn.jpg"
          alt={`username image`}
          className={style.user_image}
        />
        <div className={style.user_body_data_cont}>
          <div className={`${style.user_data} ${style.my_data}`}>
            <p className={style.user_name}>{sender_name}</p>
            <p className={style.user_date}>
              {new Date(createdAt.toString()).toLocaleString()}
            </p>
          </div>
          <div className={`${style.user_message} ${style.my_message}`}>
            {text}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${style.chat_user_body} ${style.chat_other_body}`}
        key={index}
      >
        <img
          src="https://wallpapers.com/images/featured/7nffbkza5h89jssn.jpg"
          alt={`username image`}
          className={style.user_image}
        />
        <div className={style.user_body_data_cont}>
          <div className={`${style.user_data} ${style.other_data}`}>
            <p className={style.user_name}>{sender_name}</p>
            <p className={style.user_date}>
              {new Date(createdAt.toString()).toLocaleString()}
            </p>
          </div>
          <div className={`${style.user_message} ${style.other_message}`}>
            {text}
          </div>
        </div>
      </div>
    );
  }
};

export default ChatContent;
