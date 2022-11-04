const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers, getTalkerById } = require('./utils/talkerHandlers');

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
  const talkers = await getTalkers();
  if (!talkers.length) return res.status(200).send([]);
  
  res.status(200).send(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talker = await getTalkerById(Number(id));

  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(200).send(talker);
});
