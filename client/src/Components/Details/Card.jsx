import React from "react";
import { useSelector } from "react-redux";
import "./Card.css";

export default function Card() {
  const breed = useSelector((state) => state.detailsBreed);

  const { id, name, image, weight, height, life_span, temperament } = breed[0];

  return (
    <div className="card-container">
      <img className="card-image" src={image} alt={name} />

      <div className="card-info">
        <div>
          <h2 className="card-title">{name}</h2>
        </div>
        <p>ID: {id}</p>
        <p>Weight: {weight}</p>
        <p>Height: {height}</p>
        <p>Life Span: {life_span}</p>
        <p>Temperament</p>
        <p>{temperament?.join(", ")}</p>
      </div>
    </div>
  );
}
