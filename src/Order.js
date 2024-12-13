import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import './Order.css'
import moment from 'moment'

function Order({ order }) {

  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map(item => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}

      <h3 className='order__total'>Order Total: {dollarUS.format(order.data.amount / 100)}</h3>
    </div>
  )
}

export default Order
