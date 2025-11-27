import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Rules } from './pages/Rules';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
