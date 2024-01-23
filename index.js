import express from 'express';
import fs from 'fs/promises';

const app = express();

// Find index.html
app.get('/', async (request, response) => {
  const buf = await fs.readFile('./static/index.html');
  const html = buf.toString();
  response.send(html);
});

app.use('/', express.static('./static'));

app.listen(5080);
