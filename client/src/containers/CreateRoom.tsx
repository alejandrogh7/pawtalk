import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../hooks/useUser";
import {
  clearCreatedRoom,
  createRoom,
  selectCreatedRoom,
  selectCreatedRoomStatus,
  selectRoom,
} from "../features/rooms/roomSlice";
import style from "../styles/CreateRoom.module.css";
import { CreateRoom as CreateRoomDTO } from "../features/rooms/room.interface";
import { AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const createdRoom = useSelector(selectCreatedRoom);
  const createdRoomStatus = useSelector(selectCreatedRoomStatus);
  const room = useSelector(selectRoom);

  const navigate = useNavigate();

  const { user } = useUser();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomDTO>({
    defaultValues: {
      roomname: "",
      description: "",
      userId: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<CreateRoomDTO> = (data) => {
    dispatch(createRoom(data));

    setTimeout(() => {
      setValue("roomname", "");
      setValue("description", "");
    }, 1000);

    setSubmitted(true);
  };

  useEffect(() => {
    return () => {
      dispatch(clearCreatedRoom());
    };
  }, []);

  useEffect(() => {
    if (submitted) {
      if (createdRoomStatus === 201 && createdRoom) {
        return navigate(`/chat/${room?._id}`, { replace: true });
      } else {
        return alert("ERROR ROOM NOT CREATED");
      }
    }
  }, [createdRoom, createdRoomStatus]);

  useEffect(() => {
    setValue("userId", user ? user._id : "");
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.create_room_cont}>
      <h1 className={style.form_title}>Create Room</h1>
      <div className={style.form_input_cont}>
        <input
          type="text"
          placeholder="Roomname"
          className={style.form_input}
          {...register("roomname", {
            required: true,
            pattern: /^[a-zA-Z]+(\s[a-zA-Z]+)*\s?[a-zA-Z]{3,20}$/,
            maxLength: 20,
            minLength: 3,
          })}
        />
        {errors.roomname && (
          <span className={style.input_error}>
            Roomname should be 4-20 characters and inlude letters
          </span>
        )}
      </div>
      <div className={style.form_input_cont}>
        <textarea
          placeholder="Description"
          className={style.form_textarea}
          {...register("description", {
            required: true,
            pattern: /^[a-zA-Z0-9 ]{9,100}$/,
            maxLength: 100,
            minLength: 9,
          })}
        />
        {errors.description && (
          <span className={style.input_error}>
            Description should be 9-100 characters and include letters and
            numbers!
          </span>
        )}
      </div>
      <div className={style.form_input_cont}>
        <input
          type="submit"
          value="Create Room"
          className={style.form_submit}
        />
      </div>
    </form>
  );
};

export default CreateRoom;
