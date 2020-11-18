import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Post = ({ post, history }) => {
  return (
    <Card className="my-3 border-warning shadow p-3 mb-5 bg-white rounded">
      <Card.Header className="text-info rounded">{post.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> {post.content} </p>
          <footer className="blockquote-footer text-success">
            <cite title="Source Title">{post.author}</cite>
          </footer>
        </blockquote>
      </Card.Body>
      <div className="d-flex justify-content-between">
        <Link to={`/posts/${post.id}`} className="btn btn-light">
          Edit Post
        </Link>
      </div>
    </Card>
  );
};

export default Post;
