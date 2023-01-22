import React from "react";
import style from "./loading.module.css";

export default function Loading() {
  return (
    <div className={style.loadingContainer}>
      <img
        src="https://media0.giphy.com/media/Mvi1ZqG17NSso/giphy.gif?cid=6c09b952zip81pl7nmczzgs2edpne164cebaz3zpwdql72bv&rid=giphy.gif&ct=s"
        alt="loading"
      />
      <p>LOADING...</p>
    </div>
  );
}
