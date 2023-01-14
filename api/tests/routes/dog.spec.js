/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: 500,
  name: 'Pug',
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () => {
      agent.get('/dogs').expect(200);
    }
    );

  });

  describe('GET /dogs?name=String', () => {
    it('should get 200 with a query name Juan to get msg not found', async () => {
      const data = await agent.get('/dogs?name=Juan').expect(200);

      expect(data.body.msg).to.be.equals(`Dogs not found with that name`);
    }
    );

    it('should get 200 with a name query Affenpinscher', async () => {
      const data = await agent.get('/dogs?name=Affenpinscher').expect(200);

      expect(data.body.length).to.be.equals(1);
    }
    );
  })

  describe('GET /dogs/:id', () => {
    it('should get 200 with a valid id', () => {
      agent.get('/dogs/1').expect(200);
    }
    );

    it('should get 200 with a invalid id and msg', async () => {
      const result = await agent.get('/dogs/4034').expect(200);

      expect(result.body.msg).to.be.equals('Dog not found')
    }
    );
  });


});
