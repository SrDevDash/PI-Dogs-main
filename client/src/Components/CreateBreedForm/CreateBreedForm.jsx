import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./createBreedForm.module.css";
import { createBreed } from "../../Redux/Actions/actions";

export default function CreateBreedForm() {
  // Crear estado para guardar toda la información del formulario
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const temperaments = useSelector((state) => state.temperaments);

  // Manejador de eventos para actualizar el estado cuando el usuario ingresa información
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleTemp = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: [...new Set([...formData.temperaments, value])],
    });
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

    console.log(mapData);
    dispatch(createBreed(mapData));
  };

  return (
    <div>
      <button onClick={() => navigate("/home")}>HOME</button>
      <form onSubmit={handleSubmit}>
        <div className="card-info">
          <div>
            <h2 className="card-title">
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </h2>
          </div>
          <p>
            <label>Weight: </label>
            <input
              type="text"
              name="minWeight"
              placeholder="MIN WEIGHT"
              value={formData.minWeight}
              onChange={handleChange}
            />
            <input
              type="text"
              name="maxWeight"
              placeholder="MAX WEIGHT"
              value={formData.maxWeight}
              onChange={handleChange}
            />
          </p>
          <p>
            <label>Height: </label>
            <input
              type="text"
              name="minHeight"
              placeholder="MIN HEIGHT"
              value={formData.minheight}
              onChange={handleChange}
            />
            <input
              type="text"
              name="maxHeight"
              placeholder="MAX HEIGHT"
              value={formData.maxheight}
              onChange={handleChange}
            />
          </p>
          <p>
            <label>Life Span: </label>
            <input
              type="number"
              name="minLifeSpan"
              placeholder="MIN LIFE SPAN"
              value={formData.minLifeSpan}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxLifeSpan"
              placeholder="MAX LIFE SPAN"
              value={formData.maxLifeSpan}
              onChange={handleChange}
            />
          </p>
          <div>
            <label>Image: </label>
            <input
              type="text"
              name="image"
              placeholder="IMAGE URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              {formData.temperaments.map((temp, i) => {
                return (
                  <div key={i}>
                    <p>{temp}</p>
                  </div>
                );
              })}
            </div>
            <label>Temperament: </label>
            <select name="temperaments" onChange={handleTemp}>
              {temperaments.map((temperament, index) => (
                <option key={index} value={temperament.name}>
                  {temperament.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
