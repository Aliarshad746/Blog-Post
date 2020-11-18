import express from 'express';
import postsRoutes from './routes/posts.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api', postsRoutes);

app.listen(5000, console.log('server is running on port 5000'));
