import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getBasketTotal } from './reducer'
import axios from './axios'
import { db } from './firebase'
import { doc, setDoc } from 'firebase/firestore'

function Payment() {
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const getClientSecret = async (basketTotal) => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${basketTotal * 100}`
      })

      setClientSecret(response.data.clientSecret)
    };

    const basketTotal = getBasketTotal(basket)
    if (basketTotal > 0) {
      getClientSecret(basketTotal);
    }
  }, [basket])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      const docRef = setDoc(doc(db, 'users', user?.uid, 'orders', paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })

      setSucceeded(true);
      setProcessing(false);
      setError(null);


      dispatch({
        type: 'EMPTY_BASKET'
      });

      navigate('/orders');
    })
  }

  const handleChange = event => {
    setDisabled(event.error ? true : false);
    setError(event.error?.message);
  }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 Main Street</p>
            <p>Anytown, NY</p>
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(item =>
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            )}
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <h3>Order Total: {dollarUS.format(getBasketTotal(basket))}</h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? "Processing" : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
