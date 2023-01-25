import React from "react";
import { useSelector } from "react-redux";
import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const breed = useSelector((state) => state.detailsBreed);
  const navigate = useNavigate();

  const { id, name, image, weight, height, life_span, temperament } = breed[0];

  const handlerGoHome = (e) => {
    navigate("/home");
  };

  return (
    <div className="card-container">
      <button className="goHome" onClick={handlerGoHome} type="submit">
        HOME
      </button>
      <img className="card-image" src={image} alt={name} />

      <div className="card-info">
        <div>
          <h2 className="card-title">{name}</h2>
        </div>
        <div className="cardSubInfo">
          <p>
            <strong>ID: </strong> {id}
          </p>
          <p>
            <strong>Weight: </strong> {weight} <strong>KG </strong>
          </p>
          <p>
            <strong>Height: </strong> {height} <strong>CM </strong>
          </p>
          <p>
            {" "}
            <strong>Life Span: </strong> {life_span}
          </p>
          <p>
            <strong>Temperament</strong>
          </p>
          <p>{temperament?.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
