import { useState } from 'react'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Feed from './Components/feed'


function App() {


  return (
    <>
   <Router>
   <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/feed' element={<Feed/>}/>

   </Routes>
  </Router>
    </>
  )
}

export default App
