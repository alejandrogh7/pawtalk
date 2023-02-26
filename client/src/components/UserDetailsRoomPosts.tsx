import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { AppDispatch } from "../app/store";
import {
  clearSignin,
  fetchSignIn,
  selectSignIn,
} from "../features/users/userSlice";
import style from "../styles/UserDetailsRoomPosts.module.css";

interface UserDetailsRoomPostsProps {
  dataNumber: number;
}

const UserDetailsRoomPosts: React.FC<UserDetailsRoomPostsProps> = ({
  dataNumber,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const user = useSelector(selectSignIn);

  useEffect(() => {
    dispatch(clearSignin());
  }, []);

  useEffect(() => {
    // dispatch(fetchSignIn(params.userID ?? ""));
  }, [user]);

  if (dataNumber === 0)
    return (
      <div className={style.data_cont}>
        {user?.createdRooms.map((room, index) => {
          return (
            <NavLink to={`/chat/${room._id}`} key={index}>
              {room.roomname}
            </NavLink>
          );
        })}
      </div>
    );
  if (dataNumber === 1) return <div></div>;
  if (dataNumber === 2) return <div></div>;
  else return <div>Data not found</div>;
};

export default UserDetailsRoomPosts;
