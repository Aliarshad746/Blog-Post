import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

const PostScreen = ({ match, history }) => {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    const getPost = async (id) => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        setPost(data);
        setTitle(post.title);
        setAuthor(post.author);
        setContent(post.content);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPost(match.params.id);
  }, [match, post.author, post.title, post.content]);

  const deleteHandler = () => {
    deletePost(match.params.id);
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostHandler = (e) => {
    e.preventDefault();
    updatePost(match.params.id);
  };

  const updatePost = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.put(`/api/posts/${id}`, { title, author, content }, config);

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to={'/'} className="btn btn-light">
        Go back
      </Link>
      <Card
        key={post.id}
        className="my-3 border-warning shadow p-3 mb-5 bg-white rounded"
      >
        <Form className="p-3" onSubmit={updatePostHandler}>
          <h4>Update Post</h4>
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
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="btn btn-dark mx-5"
              type="submit"
            >
              Update Post
            </Button>
            <Button className="btn btn-light" onClick={deleteHandler}>
              Delete Post
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PostScreen;
