import express from 'express';
import expressHandlebars from 'express-handlebars';
import fs from 'fs/promises';

const app = express();
app.engine('handlebars', expressHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

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

async function renderPage(response, page) {
  response.render(page, { menu: MENU.map(item => {
    const currentPath = (page == 'index') ? '/' : `/${page}`;
    return {
        label: item.label,
        link: item.link,
        status: (currentPath == item.link) ? 'active' : 'inactive'
    }
  }) });
}

// Create routing for index (./) requests
app.get('/', async (request, response) => {
  renderPage(response, 'index');
});
app.get('/filmer', async (request, response) => {
  renderPage(response, 'filmer');
});
app.get('/evenemang', async (request, response) => {
  renderPage(response, 'evenemang');
});

// Routing for other requests
app.use('/', express.static('./static'));

app.listen(5080);
