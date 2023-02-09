import React from "react";

interface NotFoundProps {
  text: string;
}

const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default NotFound;
