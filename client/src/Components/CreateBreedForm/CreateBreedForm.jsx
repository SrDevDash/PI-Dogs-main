import React, { useState } from "react";
import "./createBreedForm.module.css";

export default function CreateBreedForm() {
  // Crear estado para guardar toda la información del formulario
  const [formData, setFormData] = useState({
    name: "",
    minWeight: "",
    minHeight: "",
    maxWeight: "",
    maxHeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",

    temperament: [],
  });

  const temperament = ["a", "b"];
  // Manejador de eventos para actualizar el estado cuando el usuario ingresa información
  const handleChange = (event) => {
    const { name, value, options } = event.target;
    console.log(value);
    if (name === "temperament") {
      setFormData({
        ...formData,
        [name]: Array.from(options)
          .filter((o) => o.selected)
          .map((o) => o.value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Manejador de eventos para enviar la información del formulario al servidor
  const handleSubmit = (event) => {
    event.preventDefault();
    // add valitatons

    // Enviar la información al servidor
    const { name, temperament } = formData;

    const mapData = {
      name,
      temperament,
      weight: `${formData.minWeight} - ${formData.maxWeight}`,
      height: `${formData.minHeight} - ${formData.maxHeight}`,
      lifeSpan: `${formData.minLifeSpan} - ${formData.maxLifeSpan}`,
    };

    console.log(mapData);
  };

  return (
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
        <p>
          <label>Temperament: </label>
          <select name="temperament" onChange={handleChange}>
            {temperament.map((temperament, index) => (
              <option key={index} value={temperament}>
                {temperament}
              </option>
            ))}
          </select>
        </p>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
