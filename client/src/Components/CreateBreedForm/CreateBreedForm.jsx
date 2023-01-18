import React, { useState } from "react";

export default function CreateBreedForm() {
  // Crear estado para guardar toda la información del formulario
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    height: "",
    lifeSpan: "",
    temperament: [],
  });

  const temperament = ["a", "b"];
  // Manejador de eventos para actualizar el estado cuando el usuario ingresa información
  const handleChange = (event) => {
    const { name, value, options } = event.target;
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
    console.log(formData);
    // Enviar la información al servidor o realizar otra acción
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
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Height: </label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Life Span: </label>
          <input
            type="text"
            name="life_span"
            value={formData.lifeSpan}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Temperament: </label>
          <select
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
          >
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
