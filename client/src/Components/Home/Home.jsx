import React from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";

import { getBreeds } from "../../Redux/Actions/actions";
import { useEffect } from "react";
import { useState } from "react";

// pag = 8

const PAGINATE = 8;

export default function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.allBreeds);

  const [currentBreeds, setCurrentBreeds] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const MAX_PAGES = Math.round(breeds.length / 8);

  // get inicial data
  useEffect(() => {
    if (!breeds.length) {
      dispatch(getBreeds());
    } else {
      setCurrentBreeds(breeds.slice(0, PAGINATE));
    }
  }, [dispatch, breeds]);

  // change current info
  useEffect(() => {
    const maxRange = PAGINATE * currentPageNumber;
    const minRange = maxRange - PAGINATE;

    setCurrentBreeds(
      breeds.slice(
        minRange,
        maxRange >= breeds.length ? breeds.length : maxRange
      )
    );
  }, [currentPageNumber, breeds]);

  const nextPage = (e) => {
    if (!(MAX_PAGES < currentPageNumber + 1)) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const previous = (e) => {
    if (!(currentPageNumber - 1 < 1)) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  return (
    <div className={style.container}>
      <button onClick={previous}>Previous</button>
      <div>{currentPageNumber}</div>
      <button onClick={nextPage}>NEXT</button>

      <div className={style.dogsContainer}>
        {currentBreeds.map((breed, i) => {
          return (
            <div key={i} className={style.dogBox}>
              <h3>{breed.name}</h3>
              <img src={breed.image} alt="" />
              <p>{breed.weight}KG</p>
              <p>{breed.temperament}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
