import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: Map<string, PostHash> = new Map();

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts.set(id, title);

  console.error(posts.get(id));

  res.status(201).send(posts.get(id));
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});

interface PostHash {
  key: string;
  title: string;
}
