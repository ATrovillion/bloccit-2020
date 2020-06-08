// eslint-disable-next-line prefer-destructuring
const sequelize = require('../../src/db/models/index').sequelize;
// eslint-disable-next-line prefer-destructuring
const Topic = require('../../src/db/models').Topic;
// eslint-disable-next-line prefer-destructuring
const Post = require('../../src/db/models').Post;

describe('Topic', () => {
  beforeEach(done => {
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then(res => {
      Topic.create({
        title: 'Expeditions to Alpha Centauri',
        description:
          'A compilation of reports from recent visits to the star system.',
      })
        .then(topic => {
          this.topic = topic;

          Post.create({
            title: 'My first visit to Proxima Centauri b',
            body: 'I saw some rocks.',
            topicId: this.topic.id,
          }).then(post => {
            this.post = post;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe('#create()', () => {
    it('should create a topic object with a title and description', done => {
      Topic.create({
        title: 'Test topic title',
        description: 'This is the description of the test topic',
      })
        .then(topic => {
          expect(topic.title).toBe('Test topic title');
          expect(topic.description).toBe(
            'This is the description of the test topic'
          );
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it('should not create a topic with missing title or description', done => {
      Topic.create({})
        .then(topic => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain('Topic.title cannot be null');
          expect(err.message).toContain('Topic.description cannot be null');
          expect(err.message).toContain('Topic.id cannot be null');
          done();
        });
    });
  });
  describe('#getPosts()', () => {
    it('should associate a topic with new posts created in that topic', done => {
      Post.create({
        title: 'Post created for testing getPosts method',
        body: 'This is a post created to test the getPosts method',
        topicId: this.topic.id,
      }).then(newPost => {
        expect(newPost.title).toBe('Post created for testing getPosts method');
        expect(newPost.body).toBe(
          'This is a post created to test the getPosts method'
        );
        expect(this.post.topicId).toBe(this.topic.id);
        done();
      });
    });
    it('should return an array of post objects associated with the topic method is called on', done => {
      this.topic.getPosts().then(associatedPosts => {
        expect(associatedPosts.title).toBe(
          'Post created for testing getPosts method'
        );
        expect(associatedPosts.body).toBe(
          'This is a post created to test the getPosts method'
        );
        expect(associatedPosts.topicId).toBe(this.topic.id);
        done();
      });
    });
  });
});
// define tests for create method
// when calling Topic.create with valid args, topic object is created and stored in db
// define tests for the getPosts method
// create and associate a post with the topic in scope
// getPosts returns array of post objects associated with the topic the method is called on
// test should confirm that associated post is returned when that method is called
