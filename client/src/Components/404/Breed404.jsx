import React from "react";
import dog404 from "../../Img/404Dog.png";
import style from "./breed404.module.css";

export default function Breed404() {
  return (
    <div className={style.container}>
      <img src={dog404} alt="" />
      <p>Breed not found</p>
    </div>
  );
}
