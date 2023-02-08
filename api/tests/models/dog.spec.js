const { Breed, conn } = require('../../src/db.js');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');
const { expect } = require('chai');

const BreedModel = require('../../src/models/Breed.js');
const TemperamentM = require('../../src/models/Temperament.js');


describe('Breed model', () => {

  const Model = BreedModel(sequelize, dataTypes);

  const instance = new Model();

  checkModelName(Model)('Breed');

  context('properties', () => {
    ['name', 'image'].forEach(checkPropertyExists(instance))
  })

});

// context('check associations', () => {
//   const OtherModel = TemperamentM(sequelize, dataTypes) // it doesn't matter what
//   const Model = BreedModel(sequelize, dataTypes);
//   before(() => {
//     Model.associate({ OtherModel })
//   })

//   it('defined a belongsTo association with OtherModel', () => {
//     expect(Model.belongsToMany).to.have.been.calledWith(OtherModel)
//   })
// })
