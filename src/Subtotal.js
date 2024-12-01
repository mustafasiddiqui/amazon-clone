import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import { Link } from 'react-router-dom'

function Subtotal() {

  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        value={getBasketTotal(basket)}
        decimalScale={2}
        fixedDecimalScale={true}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <Link to='/payment'>
        <div>
          <button className='subtotal__button'>Proceed to Checkout</button>
        </div>
      </Link>
    </div>
  )
}

export default Subtotal
