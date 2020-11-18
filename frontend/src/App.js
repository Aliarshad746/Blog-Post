import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';

const App = () => {
  return (
    <Router>
      <main className="py-3">
        <Container>
          <Route path="/posts/:id" component={PostScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
