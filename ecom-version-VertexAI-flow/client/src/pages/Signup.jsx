import * as React from "react"
 
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
import {useNavigate} from 'react-router-dom'



const Signup = () => {
  const {loginUser,addUserData} = useUser()
  const navigate = useNavigate()


  const [SignupData, setSignupData] = React.useState({})

  const handleChange = (e) => {
    setSignupData({...SignupData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res =await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SignupData)
      })
      const data = await res.json()
      if (data.success===false) {
        alert(data.message)
        return
      }
      loginUser(data.token)
      addUserData(data.user)
      alert('Account created successfully')
      navigate('/')
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className='flex justify-center items-center mt-[3rem]'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" >Name</Label>
              <Input id="name" placeholder="Enter your Name" name="name" onChange={handleChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
               <Label htmlFor="name" >Email</Label>
              <Input id="name" placeholder="Enter your Email" name="email" onChange={handleChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
               <Label htmlFor="name" >Password</Label>
              <Input id="name" placeholder="Enter your Password" name="password" onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
               <Label htmlFor="name">Confirm password</Label>
              <Input id="name" placeholder="Reenter your password"  name="confirmPassword" onChange={handleChange}/>
            </div>
          </div>
          </form>
      </CardContent>
        
      <CardFooter className="flex flex-col gap-[.2rem] justify-center">
        <Button onClick={handleSubmit}>Create Account</Button>
        <CardDescription>Already have an Account? <Link to="/signin" className='font-bold text-black'>Sign in</Link> </CardDescription>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Signup