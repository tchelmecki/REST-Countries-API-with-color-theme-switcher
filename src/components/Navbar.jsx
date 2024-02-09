import React from 'react'
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
  return (
    <nav>
    <p>Where in the world?</p>
    <span>
    <MdOutlineDarkMode className='change-theme'/> <p>Dark mode</p>
    </span>
    </nav>
  )
}

export default Navbar