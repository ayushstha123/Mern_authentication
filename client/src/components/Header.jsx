import { Link } from 'react-router-dom'
import React from 'react'

const Header = () => {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
            <h1 className='font-bold'>Auth App</h1></Link>
            <ul className='flex gap-5'>
                <Link to="/">Home</Link>
                <Link to='/About'>About</Link>
                <Link to='/SignIn'>Sign in</Link>
            </ul>
            </div>
    </div>
  )
}

export default Header