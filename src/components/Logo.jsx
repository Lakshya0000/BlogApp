import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({ width = '100px' }) => {
  return (
    <Link to='/'>
      <div className='text-blue-900 text-center font-bold text-xl shadow '>
        BlogApp
      </div>
    </Link>
  )
}

export default Logo
