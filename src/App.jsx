import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Enquiry from './Pages/Enquiry'
import Login from './Pages/Login'
import AdminDashboard from './Pages/AdminDashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Enquiry/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>

      </Routes>


    </>
  )
}

export default App
