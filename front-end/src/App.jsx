import { useEffect, useState } from 'react'
import { api } from './utilities'
import { Outlet } from "react-router-dom"


function App() {


  return (
    <>
      <Outlet />
    </>
  )
}

export default App
