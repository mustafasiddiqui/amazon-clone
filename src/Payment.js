import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { CardElement } from '@stripe/react-stripe-js'
import { getBasketTotal } from './reducer'

function Payment() {
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  
  const [{ basket, user }] = useStateValue();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Payment stuff here
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
              <CardElement />

              <div className='payment__priceContainer'>
                <h3>Order Total: {dollarUS.format(getBasketTotal(basket))}</h3>
                <button>
                  <span>{"Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment