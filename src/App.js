import React, { useEffect } from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from './firebase'
import Checkout from './Checkout'
import Payment from "./Payment"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51HbIMPHOu2Wj38D3clKtwQ2sKx9qVjx4DtIBoZIw6NnyjIOolscyM9NsWg1StHAF9Lo4cFbqzhgBni68Bn4LFLME00wc2kaY6P")

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
          <Route path="/checkout" element={
            <>
              <Header />
              <Checkout />
            </>
          }
          />
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
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
