import React from 'react'
import './Subtotal.css'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import { Link } from 'react-router-dom'

function Subtotal() {

  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      <p>
        Subtotal ({basket.length} items): <strong>{dollarUS.format(getBasketTotal(basket))}</strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>

      <Link to='/payment'>
        <div>
          <button className='subtotal__button'>Proceed to Checkout</button>
        </div>
      </Link>
    </div>
  )
}

export default Subtotal
