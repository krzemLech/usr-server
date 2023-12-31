import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Usr, data } from './data/users';

export const app = express();

app.use(morgan('tiny'));

app.use(cors({ origin: true }));

app.use(express.json());

app.use((req, res, next) => {
  const headers = req.headers;
  if (headers['x-app-key'] !== process.env.APP_KEY)
    return res.status(401).json({ msg: 'access denied' });
  return next();
});

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

app.get('/users', (req, res) => {
  res.json(data.users);
});

app.post('/users', (req, res) => {
  const { name, surname, age, car } = req.body as any;
  if (!name || !surname || !age || !car) {
    return res.status(400).json({ msg: 'bad user data' });
  }
  data.addUser({ name, surname, age, car } as Usr);
  return res.status(200).json(data.users);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  data.removeUser(id);
  res.status(200).json(data.users);
});
