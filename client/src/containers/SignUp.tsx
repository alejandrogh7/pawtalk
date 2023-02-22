import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchSignUp, selectSignUp } from "../features/users/userSlice";
import style from "../styles/Sign.module.css";
import { useEffect } from "react";

type Inputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signup = useSelector(selectSignUp);

  const navigate = useNavigate();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { confirmPassword, ...signUpData } = data;
    dispatch(fetchSignUp(signUpData));

    setTimeout(() => {
      setValue("email", "");
      setValue("name", "");
      setValue("password", "");
      setValue("confirmPassword", "");
    }, 1000);
  };

  useEffect(() => {
    if (signup) {
      return navigate("/signin", { replace: true });
    }
  }, [signup]);

  const passwordValidation = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[@$!%*#?&]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return true;
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
          {...register("name", {
            required: true,
            pattern: /^[a-zA-Z0-9._]{5,20}$/,
          })}
        />
        {errors.name && <span>Invalid name</span>}
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
            validate: (value: string) => passwordValidation(value) === true,
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
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
            validate: (value: string) =>
              value === watch("password") || "The password do not match",
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>
      <div className={style.form_input_cont}>
        <input type="submit" value="Sign up" className={style.form_submit} />
      </div>
    </form>
  );
};

export default SignUp;
