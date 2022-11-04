const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers } = require('./utils/talkerHandlers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers.length) {
    return res.status(200).send([]);
  }
  res.status(200).send(talkers);
});
