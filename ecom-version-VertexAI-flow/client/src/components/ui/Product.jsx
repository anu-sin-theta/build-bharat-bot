import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {Button} from "@/components/ui/button"
  import {useUser} from '@/store/user.jsx'
  import { FaStar } from "react-icons/fa";
  import { useNavigate } from 'react-router-dom'


const Product = ({id,title,description,rating,price,image,category,brand}) => {
  const navigate = useNavigate()
    const {addToCart,products,cart} = useUser()


  return (
  
        <Card className="w-[20rem] h-[26rem]">
          <CardHeader className="">
            <img src={image} alt="" className='w-[18rem] h-[10rem]'/>
          </CardHeader>
          <CardContent className="flex justify-center items-center flex-col gap-2"> 
            <CardTitle>{title}</CardTitle>
            <CardDescription>{brand}</CardDescription>
            <CardTitle>{` ₹${price*85}`}</CardTitle>
          </CardContent>
          <CardFooter className='flex flex-col justify-center gap-2'>
            <CardDescription className='flex gap-2 justify-center items-center'>{`${rating}`}<FaStar /></CardDescription>
          
            <Button onClick={()=>{
              navigate(`/product/${id}`)
              window.location.reload()
          }}>View More</Button>
         
            
          </CardFooter>
        </Card>
  )
}


export default Product