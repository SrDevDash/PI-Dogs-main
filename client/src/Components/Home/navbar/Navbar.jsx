import React from "react";
import { useDispatch } from "react-redux";
import { getBreedsByName } from "../../../Redux/Actions/actions";
import { useState } from "react";

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    dispatch(getBreedsByName(inputValue));
  };

  const onChanceInput = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input onChange={onChanceInput} type="text" placeholder="Dog Name" />
      <button onClick={searchHandler}>Search</button>
    </div>
  );
}
