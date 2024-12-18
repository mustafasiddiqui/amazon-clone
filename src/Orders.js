import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Order from './Order';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      const q = query(collection(db, "users", user?.uid, "orders"), orderBy('created', 'desc'));
      onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    }

    if (user) {
      getOrders();
    } else {
      setOrders([]);
    }


  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders__order'>
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
