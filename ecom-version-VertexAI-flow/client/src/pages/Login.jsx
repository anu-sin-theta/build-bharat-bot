 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import {useUser} from '../store/user.jsx'
import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"


const Login = () => {

 const { toast } = useToast()
const {loginUser} = useUser()
const [LoginData, setLoginData] = useState({})
const navigate = useNavigate()

const handleChange = (e) => {
  setLoginData({...LoginData, [e.target.name]: e.target.value})
}

const  toastMessage =({message,variant}) =>{
  toast({
    description: `${message}`,
    variant: `${variant}`,
  })
}

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res =await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(LoginData)
    })
    const data = await res.json()
    if (data.success===false) {
      toastMessage({message: data.message,variant:'destructive'})
      return
    }

    toastMessage({message: data.message,variant:'outline'})
    loginUser(data.token)
    navigate('/')
  } catch (error) {
    console.log(error);
  }
}

  return (

    <div className='flex justify-center items-center mt-[3rem]'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome Back!!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Enter your Name" name="email" onChange={handleChange} />
            </div>
        
            <div className="flex flex-col space-y-1.5">
               <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="Enter your Password" name="password" onChange={handleChange} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-[.2rem] justify-center">
        <Button onClick={handleSubmit}>Sign In</Button>
        <CardDescription>Don't have an account? <Link to="/signup" className='font-bold text-black'>Create Account</Link> </CardDescription>
      </CardFooter>
    </Card>
   
    </div>
    
  )

}

export default Login