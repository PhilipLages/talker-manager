const express = require('express');
const bodyParser = require('body-parser');
const { 
  getTalkers, 
  getTalkerById, 
  getRandomToken, 
  createNewTalker,
  updateTalker,
  deleteTalker, 
} = require('./utils/talkerHandlers');
const { 
  validateEmail, 
  validatePassword, 
  validateToken, 
  validateName, 
  validateAge,
  validateTalk,
  validateRate, 
} = require('./middlewares');

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

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const token = getRandomToken();

  res.status(200).json({ token });
});

app.post('/talker', validateToken, validateName, 
  validateAge, validateTalk, validateRate, async (req, res) => {
  const { name, age, talk: { rate, watchedAt } } = req.body;

  const newTalker = await createNewTalker(name, age, rate, watchedAt);

  res.status(201).send(newTalker);
});

app.put('/talker/:id', validateToken, validateName, 
validateAge, validateTalk, validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { rate, watchedAt } } = req.body;
  
  const talkerToUpdate = await updateTalker(Number(id), ...[name, age, watchedAt, rate]);

  res.status(200).send(talkerToUpdate);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  await deleteTalker(id);

  res.status(204).end();
});
