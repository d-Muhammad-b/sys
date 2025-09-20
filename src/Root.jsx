import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'
import Cs from './assets/cs/cs'
import Mine from './assets/minecraft/mine'
import Murojat from './pages/murojatlar/murojat'



function Root() {
  return (
    <div>
        <BrowserRouter>
           <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/cs' element={<Cs></Cs>}></Route>
            <Route path='/mine' element={<Mine></Mine>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/admin' element={<Admin></Admin>}></Route>
            <Route path='/murojat' element={<Murojat></Murojat>}></Route>

           </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Root