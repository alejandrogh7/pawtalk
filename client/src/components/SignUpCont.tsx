import Navbar from "./Navbar";
import SignUp from "../containers/SignUp";
import style from "../styles/SignCont.module.css";

const SignUpCont = () => {
  return (
    <div className={style.sign_cont}>
      <SignUp />
      <Navbar />
    </div>
  );
};

export default SignUpCont;
