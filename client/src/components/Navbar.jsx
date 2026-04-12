import React from 'react'
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../Context/authContext';

export const Navbar = () => {
  const {isloggedIn, setisloggedIn} = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-row justify-between items-center px-3 py-2 md:px-10 shadow-sm">
      <p className="text-lg font-semibold cursor-pointer" onClick={()=>navigate('/')}>Get Better</p>
        {
          !isloggedIn && (<div className="flex flex-row gap-3">
            <Button className="bg-white text-blue-400 border border-gray-300 cursor-pointer" onClick={()=> navigate('/login')}>Login</Button>
            <Button className="cursor-pointer" onClick={()=> navigate('/signup')}>Signup</Button>
          </div>)
        }
        {
          isloggedIn && (<div className="flex gap-2 ">
            <Button className="bg-white text-gray-700 border border-gray-300 cursor-pointer" onClick={()=>navigate('/reports')}>Reports</Button>
            <Button onClick={()=>setisloggedIn(false)} className="text-red-400 bg-white border border-gray-300 cursor-pointer">Logout</Button>
          </div>
          )
        }
        
     
    </div>
  )
}
