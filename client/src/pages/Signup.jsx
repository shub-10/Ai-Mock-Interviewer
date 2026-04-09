import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

export const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL
  const createAccount = async()=>{
     const res = await fetch(`${serverBaseUrl}/api/v2/auth/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({name, email, password})
     })
     const data = await res.json()
     if(res.ok ){
      navigate('/login');
     }
     else if(res.status === 409) alert("Email already exists");
     else alert(data.message || "Account not created. Try Again");
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
               <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Kaptaan..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer" onClick={createAccount}>
           Create Account
          </Button>
          <p>Already have account <Button variant='link' className="cursor-pointer" onClick={()=>navigate("/login")}>Login</Button></p>
        </CardFooter>
      </Card>
    </div>
  )
}
