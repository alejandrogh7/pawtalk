import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  fetchSignUp,
  selectSignUp,
  selectSignUpStatus,
} from "../features/users/userSlice";
import style from "../styles/Sign.module.css";
import { useEffect, useState } from "react";
import useCookies from "../hooks/useCookies";

type Inputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const aToken = useCookies("access_token", "");
  const rToken = useCookies("refresh_token", "");

  const [submitted, setSubmitted] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const signup = useSelector(selectSignUp);
  const signupStatus = useSelector(selectSignUpStatus);

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

    setSubmitted(true);
  };

  useEffect(() => {
    if (aToken && rToken) {
      return navigate("/chat", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      if (signupStatus === 201) {
        return navigate("/signin", { replace: true });
      } else {
        return alert("ERROR SIGN UP ERROR");
      }
    }
  }, [signup, signupStatus]);

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
        {errors.email && (
          <span className={style.input_error}>
            It should be a valid email address!
          </span>
        )}
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
        {errors.name && (
          <span className={style.input_error}>
            Username should be 5-20 characters and shouldn't include any special
            character just underscore (_)!
          </span>
        )}
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
        {errors.password && (
          <span className={style.input_error}>
            Password should be 8-20 characters and include at least 1 capital
            letter (A), 1 number (1) and 1 special character ($)!
          </span>
        )}
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
          <span className={style.input_error}>Passwords don't match!</span>
        )}
      </div>
      <div className={style.form_input_cont}>
        <input type="submit" value="Sign up" className={style.form_submit} />
      </div>
    </form>
  );
};

export default SignUp;
