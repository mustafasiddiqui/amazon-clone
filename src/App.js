import React, { useEffect } from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from './firebase'

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });
  }, []);

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
