import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./landingPage.module.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/home");
  };

  return (
    <div className={style.container}>
      <h1>DOG WIKI</h1>
      <button onClick={handleClick}>GO IN</button>
    </div>
  );
}
