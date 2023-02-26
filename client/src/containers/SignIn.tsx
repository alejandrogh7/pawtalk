import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import {
  fetchSignIn,
  selectSignIn,
  clearSignup,
  selectSignInStatus,
} from "../features/users/userSlice";
import useCookies from "../hooks/useCookies";
import style from "../styles/Sign.module.css";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const aToken = useCookies("access_token", "");
  const rToken = useCookies("refresh_token", "");

  const [submitted, setSubmitted] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const signin = useSelector(selectSignIn);
  const signinStatus = useSelector(selectSignInStatus);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(fetchSignIn(data));

    setTimeout(() => {
      setValue("password", "");
      setValue("email", "");
    }, 1000);

    setSubmitted(true);
  };

  useEffect(() => {
    if (signin?._id) {
      return navigate("/chat", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (aToken && rToken) {
      return navigate("/chat", { replace: true });
    }
  }, []);

  useEffect(() => {
    dispatch(clearSignup());
  }, []);

  useEffect(() => {
    if (submitted) {
      if (signinStatus === 201) {
        return navigate("/chat", { replace: true });
      } else {
        return alert("ERROR SIGN IN ERROR");
      }
    }
  }, [signin, signinStatus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.signin_cont}>
      <h1 className={style.form_title}>Sign In</h1>
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
        <input type="submit" value="Sign in" className={style.form_submit} />
      </div>
    </form>
  );
};

export default SignIn;
