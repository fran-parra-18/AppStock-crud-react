

import type { ReactNode } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'


interface props {
  children: ReactNode
}

function App({children}:props) {


  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}

export default App
