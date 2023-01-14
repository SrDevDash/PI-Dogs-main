import React from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";

import { getBreeds } from "../../Redux/Actions/actions";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.allBreeds);

  useEffect(() => {
    !breeds.length && dispatch(getBreeds());
  }, [dispatch, breeds]);

  return (
    <div className={style.container}>
      <div>a</div>
      <div className={style.dogsContainer}>
        {breeds.map((breed, i) => {
          return (
            <div key={i} className={style.dogBox}>
              <h3>{breed.name}</h3>
              <img src={breed.image} alt="" />
              <p>{breed.weight.metric}CM</p>
              <p>{breed.temperament}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
