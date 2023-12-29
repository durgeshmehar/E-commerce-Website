import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders'

export default function UserOrdersPage() {
  return (
    <>  
       <Navbar >
           <h1 className='mx-auto text-2xl font-semibold'> My Orders</h1>
            <UserOrders />
       </Navbar>
    </>
  )
}