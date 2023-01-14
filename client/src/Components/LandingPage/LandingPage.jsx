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
      <h1>Dog Wiki</h1>
      <button onClick={handleClick}>Enter</button>
    </div>
  );
}
