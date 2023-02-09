import React from "react";
import style from "../styles/NotFound.module.css";

interface NotFoundProps {
  text: string;
}

const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  return (
    <div className={style.not_found_cont}>
      <h1>{text}</h1>
    </div>
  );
};

export default NotFound;
