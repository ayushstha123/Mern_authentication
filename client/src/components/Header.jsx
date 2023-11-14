import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux';
const Header = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
            <h1 className='font-bold'>Auth App</h1></Link>
            <ul className='flex gap-5'>
                <Link to="/">Home</Link>
                <Link to='/About'>About</Link>
                <Link to='/Profile'>
                  {currentUser ? <img className=' w-7 justify-center mb-1 h-7 rounded-full object-cover ' src={currentUser.profilePic} alt="" />:
                (<li>SignIn</li>)  
                }
                </Link>
            </ul>
            </div>
    </div>
  )
}

export default Header