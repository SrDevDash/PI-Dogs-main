import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  getBreedsByName,
  getTemperament,
  filterBreeds,
} from "../../../Redux/Actions/actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState({});

  const searchHandler = (e) => {
    dispatch(getBreedsByName(inputValue));
  };

  useEffect(() => {
    if (!temperaments.length) {
      dispatch(getTemperament());
    }
  }, [temperaments, dispatch]);

  const onChanceInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const submitFilter = (e) => {
    dispatch(filterBreeds(filter));
  };

  return (
    <div>
      <select name="temperament" onChange={handleFilter}>
        <option value="">Temperament</option>
        {temperaments.map((temperament, i) => {
          return (
            <option key={i} value={temperament.name}>
              {temperament.name}
            </option>
          );
        })}
      </select>
      <select onChange={handleFilter} name="breeds">
        <option value="">Breeds</option>
        <option value="Real Breeds">Real Breeds</option>
        <option value="Custom Breeds">Custom Breeds</option>
      </select>

      <select onChange={handleFilter} name="weigth">
        <option value="">Weigth</option>
        <option value="Weigth ASC">ASC</option>
        <option value="Weigth DESC">DESC</option>
      </select>

      <select onChange={handleFilter} name="alpha">
        <option value="">ORDER</option>
        <option value="DESC">A-Z</option>
        <option value="ASC">Z-A</option>
      </select>

      <button onClick={submitFilter}>Filter</button>
      <input onChange={onChanceInput} type="text" placeholder="Dog Name" />
      <button onClick={searchHandler}>Search</button>
    </div>
  );
}
