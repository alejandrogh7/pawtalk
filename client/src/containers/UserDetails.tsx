import { useState } from "react";
import UserDetailsRoomPosts from "../components/UserDetailsRoomPosts";
import useUser from "../hooks/useUser";
import style from "../styles/UserDetails.module.css";

const UserDetails = () => {
  const [selected, setSelected] = useState<number>(0);

  const { user } = useUser();

  if (!user) {
    return <div>Wait while fetching</div>;
  }

  return (
    <div className={style.user_details}>
      <div className={style.user_sensitive_info}>
        <img
          src={`https://pics.me.me/thumb_image-about-aesthetic-in-profile-pictures-by-emo-kiddo-50433948.png`}
          alt={`User name profile photo`}
          className={style.user_image}
        />
        <p className={style.user_username}>{user.name}</p>
        <div className={style.user_info}>
          <p className={style.user_email}>Email</p>
          <p className={style.user_email_data}>{user.email}</p>
        </div>
        <div className={style.user_links}>
          <p className={style.user_edit_delete}>Edit Profile</p>
          <p className={style.user_edit_delete}>Delete Account</p>
        </div>
      </div>
      <div className={style.posts_rooms_btns}>
        <div className={style.posts_rooms}>
          <p
            className={
              selected === 0
                ? style.posts_rooms_btn_selected
                : style.posts_rooms_btn
            }
            onClick={() => setSelected(0)}
          >
            Created Rooms
          </p>
          <p
            className={
              selected === 1
                ? style.posts_rooms_btn_selected
                : style.posts_rooms_btn
            }
            onClick={() => setSelected(1)}
          >
            Rooms
          </p>
          <p
            className={
              selected === 2
                ? style.posts_rooms_btn_selected
                : style.posts_rooms_btn
            }
            onClick={() => setSelected(2)}
          >
            Posts
          </p>
        </div>
        <UserDetailsRoomPosts dataNumber={selected} />
      </div>
    </div>
  );
};

export default UserDetails;
