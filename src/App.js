import React from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={
            <>
              <Login />
            </>
          }
          />
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
