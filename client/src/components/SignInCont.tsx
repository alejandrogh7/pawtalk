import SignIn from "../containers/SignIn";
import Navbar from "./Navbar";
import style from "../styles/SignCont.module.css";

const SignInCont = () => {
  return (
    <div className={style.sign_cont}>
      <SignIn />
      <Navbar />
    </div>
  );
};

export default SignInCont;
