import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

let posts = [
  {
    id: uuidv4(),
    author: 'John Doe',
    title: 'Lorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac sem quam. Suspendisse in nisi dui. Mauris imperdiet leo blandit libero pretium auctor. Maecenas a euismod justo. Sed purus orci, ultricies eget justo ac, gravida vestibulum lectus. Suspendisse vel neque id tellus commodo pulvinar. Morbi fermentum est eu elit tincidunt vulputate. Vivamus ultrices felis egestas mi consequat, in porttitor orci vehicula. Sed quis turpis eu nisi aliquet placerat in at eros. Nunc euismod purus lorem, et feugiat tortor pulvinar a. Suspendisse bibendum turpis urna, vel ullamcorper nisl rutrum in.',
  },
  {
    id: uuidv4(),
    author: 'Jane Doe',
    title: 'Epsum',
    content:
      'Nullam dapibus leo ac diam tincidunt, quis laoreet orci porttitor. Mauris laoreet et dui in sodales. Donec laoreet libero non egestas interdum. Morbi mattis aliquam viverra. Praesent finibus porta fringilla. Donec volutpat id leo non tempus. Donec at mollis leo. Curabitur bibendum cursus pharetra. Sed venenatis sagittis diam vitae egestas. Donec ut ornare enim. Phasellus faucibus efficitur velit, sed feugiat velit.',
  },
];

router.get('/posts', (req, res) => {
  res.json(posts);
});

router.post('/posts', (req, res) => {
  const post = req.body;

  posts.push({ ...post, id: uuidv4() });
  res.send(`post of ${post.author} is added to DB`);
});

router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const foundPost = posts.find((post) => post.id === id);

  res.json(foundPost);
});

router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  posts = posts.filter((post) => post.id !== id);

  res.send(`posts with id: ${id} is deleted from the database`);
});

router.put('/posts/:id', (req, res) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === id);
  if (post) {
    post.author = req.body.author || post.author;
    post.content = req.body.content || post.content;
    post.title = req.body.title || post.title;
  }

  res.send(`Post has been updated`);
});

export default router;
