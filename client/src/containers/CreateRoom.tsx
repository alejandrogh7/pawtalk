import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import useUser from "../hooks/useUser";
import { createRoom } from "../features/rooms/roomSlice";
import style from "../styles/CreateRoom.module.css";
import { CreateRoom as CreateRoomDTO } from "../features/rooms/room.interface";
import { AppDispatch } from "../app/store";

const CreateRoom = () => {
  const dispatch = useDispatch<AppDispatch>();

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
  });

  const onSubmit: SubmitHandler<CreateRoomDTO> = (data) => {
    dispatch(createRoom(data));

    setTimeout(() => {
      setValue("roomname", "");
      setValue("description", "");
    }, 1000);
  };

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
            pattern: /^[a-zA-Z]+(\s[a-zA-Z]+)*\s?[a-zA-Z]{4,20}$/,
            maxLength: 20,
            minLength: 4,
          })}
        />
        {errors.roomname && <span>Just use letters and spaces</span>}
      </div>
      <div className={style.form_input_cont}>
        <textarea
          placeholder="Description"
          className={style.form_textarea}
          {...register("description", {
            required: true,
            pattern: /^[a-zA-Z0-9 ]{9,40}$/,
            maxLength: 40,
            minLength: 9,
          })}
        />
        {errors.description && <span>Min and Max length (10 - 40)</span>}
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