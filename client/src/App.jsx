import React from 'react'
// import { Button } from "@/components/ui/button"
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import {Home} from './pages/Home';
import {Footer} from './components/Footer'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {Interview} from './pages/Interview';


export const App = () => {
  return (
    <div className="w-full min-h-screen m-0 p-0">
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/job-interviews' element={<Interview/>} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  )
}
