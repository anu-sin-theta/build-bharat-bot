import React from 'react'
import { Button } from "@/components/ui/button"
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@/store/user.jsx';
import Profile from './profile';

const Navbar = () => {
  const { userData ,isLoggedIn} = useUser();
  return (
    <div className='flex justify-between px-[1rem] py-[1.2rem] items-center'>
      <div className='flex gap-[10rem]'>
        <Link to='/' className='font-bold text-4xl font-mono'>Ecomm</Link>
        <div>
          <ul className='flex gap-[3rem]'>
            <li className='text-xl hover:border-b-4 hover:border-black hover:cursor'>Fashion</li>
            <li className='text-xl hover:border-b-4 hover:border-black hover:cursor'>Electronics</li>
            <li className='text-xl hover:border-b-4 hover:border-black hover:cursor'>Grocery</li>
          </ul>
        </div>
      </div>
      <div className='flex gap-[1rem] items-center mr-[2rem]'>
        {isLoggedIn ? (
        <>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{<FaCartArrowDown />}</AvatarFallback>
          </Avatar>
          <Profile/>
        </>
        )
        : 
        (
        <>
        <Link to='/signin'>
        <Button>Sign In</Button>
        </Link>
        <Link to='/signup'>
        <Button>Sign up</Button>
        </Link></>
  )
    }
        {/* <FaCartArrowDown  className='text-2xl'/> */}

      </div>
    </div>
  )
}

export default Navbar