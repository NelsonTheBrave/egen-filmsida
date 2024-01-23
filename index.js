import express from 'express';
import expressHandlebars from 'express-handlebars';
import fs from 'fs/promises';

const app = express();
app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

const MENU = [
  {
    label: 'Homepage',
    link: '/',
  },
  {
    label: 'About us',
    link: '/about',
  },
  {
    label: 'Contact us',
    link: '/contact',
  },
];

async function renderPage(response, page) {
response.render(page)
}

// Create routing for index (./) requests
app.get('/', async (request, response) => {
  renderPage(response, 'index');
});

// Routing for other requests
app.use('/', express.static('./static'));

app.listen(5080);
