import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Jobs from './components/Jobs'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobsDetails from './components/JobsDetails'


const App = () => {

  return (
    <>
<<<<<<< HEAD
=======

>>>>>>> 87b7e8a50e4a3eba55dbea518447bff41b837971
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Home} />} />
        <Route path="/jobs" element={<ProtectedRoute Component={Jobs} />} />
        <Route path="/jobs/:id" element={<ProtectedRoute Component={JobsDetails} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App