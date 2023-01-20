import React from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";

import { clearBreed, getBreeds } from "../../Redux/Actions/actions";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./navbar/Navbar";
import { useNavigate } from "react-router-dom";

// pag = 8

const PAGINATE = 8;

export default function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.allBreeds);
  const errors = useSelector((state) => state.errors);
  const filterBreeds = useSelector((state) => state.filterBreeds);

  const [currentBreeds, setCurrentBreeds] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const navigate = useNavigate();

  const MAX_PAGES = Math.round(filterBreeds.length / 8);

  useEffect(() => {
    errors && alert(errors);
  }, [errors]);

  useEffect(() => {
    filterBreeds.length && setCurrentBreeds(filterBreeds);
  }, [filterBreeds]);

  // get inicial data
  useEffect(() => {
    if (!breeds.length) {
      dispatch(getBreeds());
    } else {
      setCurrentBreeds(breeds.slice(0, PAGINATE));
    }
  }, [dispatch, breeds]);

  useEffect(() => {
    console.log("clear");
    dispatch(clearBreed());
  }, [dispatch]);

  // change current info
  useEffect(() => {
    const maxRange = PAGINATE * currentPageNumber;
    const minRange = maxRange - PAGINATE;

    setCurrentBreeds(
      filterBreeds.slice(
        minRange,
        maxRange >= filterBreeds.length ? filterBreeds.length : maxRange
      )
    );
  }, [currentPageNumber, filterBreeds]);

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
      <Navbar setCurrentPageNumber={setCurrentPageNumber} navigate={navigate} />

      <div className={style.pagination}>
        <button onClick={previous}>Previous</button>
        <h5>{currentPageNumber}</h5>
        <button onClick={nextPage}>NEXT</button>
      </div>
      <div className={style.dogsContainer}>
        {currentBreeds.map((breed, i) => {
          return (
            <div
              key={i}
              className={style.dogBox}
              onClick={() => navigate(`/breed/${breed.id}`)}
            >
              <h3>{breed.name}</h3>
              <img src={breed.image} alt="" />
              <h5>Weight</h5>
              <p>{breed.weight}KG</p>
              <h5>Temperaments</h5>
              <p>{breed.temperament?.join(", ")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
