import express from 'express';
import expressHandlebars from 'express-handlebars';
import { fetchMovie, fetchMovies } from './filmer.js';
import { renderPage } from './render.js';

const app = express();
app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use('/', express.static('./static'));
app.use('/filmer', express.static('./static')); //Onödigt med två routes?

app.get('/', async (req, response) => {
    renderPage(response, 'index');
  });
  app.get('/filmer', async (req, response) => {
    const movieList = await fetchMovies();
    renderPage(response, 'filmer', movieList);
  });
  app.get('/filmer/:movieId', async (req, response) => {
    const movie = await fetchMovie(req.params.movieId);
    renderPage(response, 'film', null, movie);
  });
  app.get('/evenemang', async (req, response) => {
    renderPage(response, 'evenemang');
  });

export default app;