import React from "react";
import style from "./loading.module.css";

export default function Loading() {
  return (
    <div className={style.loadingContainer}>
      <img
        src="https://media.tenor.com/GPbjPPV9GrgAAAAM/oskar-boston-terrier.gif"
        alt="loading"
      />
      <p>LOADING...</p>
    </div>
  );
}
