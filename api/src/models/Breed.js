const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Breed', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true
    },
    life_span: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
