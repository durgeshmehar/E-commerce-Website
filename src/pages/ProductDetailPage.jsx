import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import Navbar from '../features/navbar/Navbar'

export default function ProductDetailPage() {
  return (
    <>  
       <Navbar >
            <ProductDetail />
       </Navbar>
    </>
  )
}
