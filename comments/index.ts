import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

type Comment = {
  id: string;
  content: string;
};

const commentsByPostId: Map<string, Comment> = new Map();

app.get('/posts/:id/comments', (req, res) => {
  console.log(commentsByPostId);
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const content = req.body;

  const comments: Comment[] = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
  console.log(commentsByPostId);
});

app.listen(4001, () => {
  console.log('comments listening on port 4001');
});
