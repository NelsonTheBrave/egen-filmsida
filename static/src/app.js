import express from 'express';
import expressHandlebars from 'express-handlebars';
import { fetchMovie, fetchMovies } from './filmer.js';
import { renderPage } from './render.js';
import fs from 'fs/promises';

const app = express();
app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use('/', express.static('./static'));
// app.use('/filmer', express.static('./static')); //Onödigt med två routes?

app.get('/', async (req, res) => {
  renderPage(res, 'index');
});

app.get('/filmer', async (req, res) => {
  const movieList = await fetchMovies();
  renderPage(res, 'filmer', movieList);
});

app.get('/filmer/:movieId', async (req, res) => {
  const movie = await fetchMovie(req.params.movieId);
  const page = movie ? 'film' : 'error';
  renderPage(res, page, null, movie);
});

app.get('/evenemang', async (req, res) => {
  renderPage(res, 'evenemang');
});

app.get('/loggain', async (request, response) => {
  const buf = await fs.readFile('./static/src/loggain.html');
  const html = buf.toString();
  response.send(html);
});

app.get('/registrera', async (request, response) => {
  const buf = await fs.readFile('./static/src/registrera.html');
  const html = buf.toString();
  response.send(html);
});

export default app;
