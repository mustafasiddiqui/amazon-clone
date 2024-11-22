import React from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
          }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
