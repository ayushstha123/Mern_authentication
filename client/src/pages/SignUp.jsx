import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [loading,setLoading]=useState();
  const [error,setError]=useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);

 const res = await fetch("http://localhost:3000/api/auth/signup",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),  
    });
    const data = await res.json();
    setLoading(false);
    if(data.success===false){
setError(true);
return;
    }
    }catch(err){
      setLoading(false);
      setError(true);
    }
   
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-gray-100 min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl font-semibold text-center">Sign Up</h1>
            <input
              type="text"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              id="username"
              placeholder="username"
              onChange={handleChange}
            />

            <input
              type="text"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              id="email"
              placeholder="email"
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />


            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1"
            >{loading ? 'Loading...':'SIGN UP'}</button>
          </div>

          <div className="flex text-gray-800 mt-6 gap-3">
            Already have an account?
            <Link to='/SignIn' className="no-underline border-b border-blue text-blue-500" href="../login/">
              Log in
            </Link>.
          </div>
          <p className='text-red-500'>{error ? 'Something went wrong!!':''}</p>

        </div>
      </form>
    </div>
  )
}

export default SignUp