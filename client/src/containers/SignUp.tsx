import { useForm, SubmitHandler } from "react-hook-form";
import style from "../styles/Sign.module.css";

type Inputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setValue("email", "");
    setValue("username", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.signin_cont}>
      <h1 className={style.form_title}>Sign Up</h1>
      <div className={style.form_input_cont}>
        <input
          type="email"
          placeholder="Email"
          className={style.form_input}
          {...register("email", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          })}
        />
        {errors.email && <span>Invalid email</span>}
      </div>
      <div className={style.form_input_cont}>
        <input
          type="text"
          placeholder="Username"
          className={style.form_input}
          {...register("username", {
            required: true,
            pattern: /^[a-zA-Z._]{5,20}$/,
          })}
        />
        {errors.email && <span>Invalid email</span>}
      </div>
      <div className={style.form_input_cont}>
        <input
          type="password"
          placeholder="Password"
          className={style.form_input}
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&^><==_}]{8,20}$/,
          })}
        />
        {errors.password && <span>Invalid password</span>}
      </div>
      <div className={style.form_input_cont}>
        <input
          type="password"
          placeholder="Confirm password"
          className={style.form_input}
          {...register("confirmPassword", {
            required: true,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&^><==_}]{8,20}$/,
          })}
        />
        {errors.password && <span>Invalid password</span>}
      </div>
      <div className={style.form_input_cont}>
        <input type="submit" value="Sign up" className={style.form_submit} />
      </div>
    </form>
  );
};

export default SignUp;
