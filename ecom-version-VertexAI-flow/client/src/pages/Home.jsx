import React from 'react'
import Product from '../components/ui/Product'
import {useUser} from '@/store/user.jsx'
import { useEffect } from 'react'
const Home = () => {
  const {products,addProducts} = useUser()
useEffect( ()=> {
    async function fetchData() {
    try {
    const response = await fetch('http://localhost:3000/api/products/')
    const data = await response.json()
    addProducts(data)
    } catch (error) {
      console.log(error);
    }
  }
  fetchData()
  
    
}, [])

  return (
    <div className='flex justify-center items-center gap-3 flex-wrap'>
    {
      products.map((product) => (
        <Product id={product.id} title={product.title} description={product.description} image={product.thumbnail} rating={product.rating} price={product.price} brand={product.brand}/>
      ))
    }
    </div>
  )
}

export default Home