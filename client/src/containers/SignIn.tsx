import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  fetchSignIn,
  selectSignIn,
  clearSignup,
} from "../features/users/userSlice";
import style from "../styles/Sign.module.css";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signin = useSelector(selectSignIn);

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
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(fetchSignIn(data));

    setTimeout(() => {
      setValue("password", "");
      setValue("email", "");
    }, 1000);
  };

  useEffect(() => {
    dispatch(clearSignup());
  }, []);

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
        <input type="submit" value="Sign in" className={style.form_submit} />
      </div>
    </form>
  );
};

export default SignIn;

// <section className={style.formcarry_container}>
//   <form action="#" method="POST">
//     <div className={style.formcarry_block}>
//       <label>Full Name</label>
//       <input
//         type="text"
//         name="name"
//         placeholder="Your first and last name"
//       />
//     </div>

//     <div className={style.formcarry_block}>
//       <label>Your Email Address</label>
//       <input type="email" name="email" placeholder="john@doe.com" />
//     </div>

//     <div className={style.formcarry_block}>
//       <label>Your Phone Number</label>
//       <input type="tel" name="telephone" placeholder="### ### ####" />
//     </div>

//     <div className={style.formcarry_block}>
//       <label>Number of people attending:</label>
//       <select name="people">
//         <option value="" selected disabled>
//           Please select..
//         </option>
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//       </select>
//     </div>

//     <div className={style.formcarry_block}>
//       <button type="submit">Send</button>
//     </div>
//   </form>
// </section>
