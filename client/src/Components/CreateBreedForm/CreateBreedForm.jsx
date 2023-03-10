import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./createBreedForm.module.css";
import { createBreed, getTemperament } from "../../Redux/Actions/actions";
import style from "./createBreedForm.module.css";

import { validator } from "./FormValidator";

export default function CreateBreedForm() {
  // Crear estado para guardar toda la información del formulario
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [animationTriger, setAnimationTriger] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    minWeight: "",
    minHeight: "",
    maxWeight: "",
    maxHeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    image: "",

    temperaments: [],
  });

  const [errors, setErrors] = useState({ a: "" });

  const canSubmit = Object.entries(errors).length === 0;

  const temperaments = useSelector((state) => state.temperaments);

  // Manejador de eventos para actualizar el estado cuando el usuario ingresa información

  !temperaments.length && dispatch(getTemperament());

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    setErrors(validator({ ...formData, [name]: value }));
  };

  const handleTemp = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: [...new Set([...formData.temperaments, value])],
    });
    setErrors(
      validator({
        ...formData,
        [name]: [...new Set([...formData.temperaments, value])],
      })
    );
  };

  // Manejador de eventos para enviar la información del formulario al servidor
  const handleSubmit = (event) => {
    event.preventDefault();
    // add valitatons

    // Enviar la información al servidor
    const { name, temperaments, image } = formData;

    const mapData = {
      name,
      temperaments,
      image,
      weight: `${formData.minWeight} - ${formData.maxWeight}`,
      height: `${formData.minHeight} - ${formData.maxHeight}`,
      life_span: `${formData.minLifeSpan} - ${formData.maxLifeSpan}`,
    };

    dispatch(createBreed(mapData));
    setAnimationTriger(true);
  };

  const handlerGoHome = (e) => {
    navigate("/home");
  };

  const deleteTemp = (name) => {
    setFormData({
      ...formData,
      temperaments: formData.temperaments.filter((data) => data !== name),
    });
  };
  // <button onClick={() => navigate("/home")}>HOME</button>;
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1>Create Breed</h1>
        <button className={style.gohome} onClick={handlerGoHome} type="submit">
          HOME
        </button>
        <div className={style.cardinfo}>
          <h1 className={style.preview}>Preview</h1>
          <div
            className={`${style.dogBox} ${
              animationTriger ? style.animation : null
            }`}
          >
            <h3>{formData.name}</h3>
            <img src={formData.image} alt="" />
            <h5>Weight</h5>
            <p className={style.weight}>
              {`${formData.minWeight} - ${formData.maxWeight}`}{" "}
              <strong key={0}>KG</strong>
            </p>
            <h5>Temperaments</h5>
            <p className={style.temperaments}>
              {formData.temperaments?.join(", ")}
            </p>
          </div>
          <div className={style.col}>
            <input
              style={errors.name && { border: "2px solid red" }}
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <span className={style.error}>{errors.name}</span>}
          <p className={style.col}>
            <input
              style={errors.weight && { border: "2px solid red" }}
              type="text"
              name="minWeight"
              placeholder="MIN WEIGHT"
              value={formData.minWeight}
              onChange={handleChange}
            />
            <input
              style={errors.weight && { border: "2px solid red" }}
              type="text"
              name="maxWeight"
              placeholder="MAX WEIGHT"
              value={formData.maxWeight}
              onChange={handleChange}
            />
          </p>
          {errors.weight && (
            <span className={style.error}>{errors.weight}</span>
          )}
          <p className={style.col}>
            <input
              type="text"
              style={errors.height && { border: "2px solid red" }}
              name="minHeight"
              placeholder="MIN HEIGHT"
              value={formData.minheight}
              onChange={handleChange}
            />
            <input
              style={errors.height && { border: "2px solid red" }}
              type="text"
              name="maxHeight"
              placeholder="MAX HEIGHT"
              value={formData.maxheight}
              onChange={handleChange}
            />
          </p>
          {errors.height && (
            <span className={style.error}>{errors.height}</span>
          )}
          <p className={style.col}>
            <input
              style={errors.lifeSpan && { border: "2px solid red" }}
              type="number"
              name="minLifeSpan"
              placeholder="MIN LIFE SPAN"
              value={formData.minLifeSpan}
              onChange={handleChange}
            />
            <input
              style={errors.lifeSpan && { border: "2px solid red" }}
              type="number"
              name="maxLifeSpan"
              placeholder="MAX LIFE SPAN"
              value={formData.maxLifeSpan}
              onChange={handleChange}
            />
          </p>
          {errors.lifeSpan && (
            <span className={style.error}>{errors.lifeSpan}</span>
          )}
          <div className={style.col}>
            <input
              style={errors.image && { border: "2px solid red" }}
              type="text"
              name="image"
              placeholder="IMAGE URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          {errors.image && <span className={style.error}>{errors.image}</span>}
          <div className={style.col}>
            <div className={style.tempContainer}>
              {formData.temperaments.map((temp, i) => {
                return (
                  <div key={i}>
                    <p
                      onClick={() => {
                        deleteTemp(temp);
                      }}
                    >
                      {temp}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.col}>
            <label>Temperament: </label>
            <select name="temperaments" onChange={handleTemp}>
              {temperaments.map((temperament, index) => (
                <option key={index} value={temperament.name}>
                  {temperament.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errors.temperaments && (
          <span className={style.error}>{errors.temperaments}</span>
        )}
        <button
          className={style.buttonSubmit}
          style={{ marginTop: 20 }}
          disabled={!canSubmit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
