import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Enquiry from './Pages/Enquiry'
import Login from './Pages/Login'
import AdminDashboard from './Pages/AdminDashboard'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Enquiry/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>

      </Routes>
      <ToastContainer
       position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </>
  )
}

export default App
