// Scope känns som det som fuckar allra mest med mig av allt....

import express from 'express';
import expressHandlebars from 'express-handlebars';
import { fetchMovie, fetchMovies } from './static/src/filmer.js';

const app = express();
app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

async function renderPage(response, page, movieList, currentMovie) {
  let currentPath = (page == 'film') ? 'filmer' : page;
  currentPath = currentPath == 'index' ? '/' : `/${currentPath}`; // Smidigare sätt att göra detta på för att aktivera menyn för filmer även för enskild film-sida?
  response.render(page, {
    menu: MENU.map((item) => {
      return {
        label: item.label,
        link: item.link,
        status: currentPath == item.link ? 'active' : 'inactive',
      };
    }),
    movies: movieList,
    movie: currentMovie,
  });
}

app.use('/', express.static('./static'));
app.use('/filmer', express.static('./static')); //Onödigt med två routes?

// MENU STUFF

const MENU = [
  {
    label: 'Startsida',
    link: '/',
  },
  {
    label: 'Filmer',
    link: '/filmer',
  },
  {
    label: 'Evenemang',
    link: '/evenemang',
  },
];

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

app.listen(5080);
