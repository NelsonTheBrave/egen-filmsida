import request from 'supertest';
import app from '../static/src/app';

// Hade gärna återanvänt kod mer här... Fick inte till det

test('Film-pages show the right movies', async () => {
  let response = await request(app).get('/filmer/1').expect(200);
  expect(response.text).toMatch('Isle of dogs');
  response = await request(app).get('/filmer/2').expect(200);
  expect(response.text).toMatch('Encanto');
  response = await request(app).get('/filmer/3').expect(200);
  expect(response.text).toMatch('The Shawshank Redemption');
  response = await request(app).get('/filmer/4').expect(200);
  expect(response.text).toMatch('Min granne Totoro');
  response = await request(app).get('/filmer/5').expect(200);
  expect(response.text).toMatch('The Muppets');
  response = await request(app).get('/filmer/6').expect(200);
  expect(response.text).toMatch('Forrest Gump');
  response = await request(app).get('/filmer/8').expect(200);
  expect(response.text).toMatch('Pulp Fiction');
});

test('Error handling for HTTP request of non existing movie Id', async () => {
  const response = await request(app).get('/filmer/12').expect(404);
  expect(response.text).toMatch('404');
});
