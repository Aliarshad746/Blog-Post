import React, { useState, useEffect } from 'react';
import { Card, Container, Col, Row, Form, Button } from 'react-bootstrap';
import './bootstrap.min.css';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get('/api/posts');

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [posts]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post('/api/posts', { author, title, content }, config);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-3 shadow-lg p-3 mb-5 bg-white rounded">
      <div className="mx-auto border-bottom border-primary py-3 d-flex justify-content-center ">
        <h1>Blog Posts</h1>
      </div>
      <Row>
        <Col md={8}>
          {posts.map((post) => (
            <Card
              key={post.id}
              className="my-3 border-warning shadow p-3 mb-5 bg-white rounded"
            >
              <Card.Header className="text-info rounded">
                {post.title}
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p> {post.content} </p>
                  <footer className="blockquote-footer text-success">
                    <cite title="Source Title">{post.author}</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4} className="my-3">
          <Card className="border-warning shadow p-3 mb-5 bg-white rounded ">
            <Form className="p-3" onSubmit={submitHandler}>
              <h4>Create Post</h4>
              <Form.Group controlId="title">
                <Form.Label className="text-info">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="author">
                <Form.Label className="text-success">Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Author Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Enter Your Content Here ...</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="btn btn-block" type="submit">
                Create Post
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
