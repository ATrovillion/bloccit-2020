/* eslint-disable prefer-destructuring */
const request = require('request');
const server = require('../../src/server');

const base = 'http://localhost:3000/topics';

const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Flair = require('../../src/db/models').Flair;

describe('routes : flairs', () => {
  beforeEach(done => {
    this.topic;
    this.flair;

    sequelize.sync({ force: true }).then(res => {
      Topic.create({
        title: 'Winter Games',
        description: 'Post your Winter Games stories.',
      }).then(topic => {
        this.topic = topic;

        Flair.create({
          name: 'Whack',
          color: 'lime green',
          topicId: this.topic.id,
        })
          .then(flair => {
            this.flair = flair;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('GET /topics/:topicId/flairs/new', () => {
    it('should render a new flair form', done => {
      request.get(`${base}/${this.topic.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Flair');
        done();
      });
    });
  });
  describe('POST /topics/:topicId/flairs/create', () => {
    it('should create a new flair and redirect', done => {
      const options = {
        url: `${base}/${this.topic.id}/flairs/create`,
        form: {
          name: 'Dope',
          color: 'teal',
        },
      };
      request.post(options, (err, res, body) => {
        Flair.findOne({ where: { name: 'Dope' } })
          .then(flair => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe('Dope');
            expect(flair.color).toBe('teal');
            expect(flair.topicId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('GET /topics/:topicId/flairs/:id', () => {
    it('should render a view with the selected flair', done => {
      request.get(
        `${base}/${this.topic.id}/flairs/${this.flair.id}`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('lime green');
          done();
        }
      );
    });
  });
  describe('POST /topics/:topicId/flairs/:id/destroy', () => {
    it('should delete the flair with the associated ID', done => {
      expect(this.flair.id).toBe(1);

      request.post(
        `${base}/${this.topic.id}/flairs/${this.flair.id}/destroy`,
        (err, res, body) => {
          Flair.findByPk(1).then(flair => {
            expect(err).toBeNull();
            expect(flair).toBeNull();
            done();
          });
        }
      );
    });
  });
  describe('GET /topics/:topicId/flairs/:id/edit', () => {
    it('should render a view with an edit flair form', done => {
      request.get(
        `${base}/${this.topic.id}/flairs/${this.flair.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('Edit Flair');
          expect(body).toContain('lime green');
          done();
        }
      );
    });
  });
  describe('POST /topics/:topicId/flairs/:id/update', () => {
    it('should return a status code of 302', done => {
      request.post(
        {
          url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
          form: {
            name: 'Super whack',
            color: 'vomit green',
          },
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(302);
          done();
        }
      );
    });
    it('should update the flair with the given values', done => {
      const options = {
        url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
        form: {
          name: 'Super whack',
        },
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();

        Flair.findOne({
          where: { id: this.flair.id },
        }).then(flair => {
          expect(flair.name).toBe('Super whack');
          done();
        });
      });
    });
  });
});
