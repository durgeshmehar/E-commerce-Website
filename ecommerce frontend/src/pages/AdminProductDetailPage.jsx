import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetail from '../features/admin/components/AdminProductDetail'

export default function ProductDetailPage() {
  return (
    <>  
       <Navbar >
            <AdminProductDetail />
       </Navbar>
    </>
  )
}
