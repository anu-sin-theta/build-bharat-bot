import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUserAlt } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {useUser} from '@/store/user.jsx';
  

const profile = () => {
    const {logoutUser} = useUser()

const handleClick = () => {
    logoutUser()
}
  return (
    <>
    <DropdownMenu>
  <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{<FaUserAlt />}</AvatarFallback>
        </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>My Orders</DropdownMenuItem>
    <DropdownMenuSeparator />
    <button onClick={handleClick}>
    <DropdownMenuItem>logout</DropdownMenuItem>
    </button>
    
  </DropdownMenuContent>
</DropdownMenu>

    
    </>
  )
}

export default profile