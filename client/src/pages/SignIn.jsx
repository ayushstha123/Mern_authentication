import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInFaliure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const { loading, error } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFaliure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(signInFaliure(err));
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-gray-100 min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl font-extralight text-center">Sign In</h1>

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
              className="w-full text-center text-sm py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1"
            >{loading ? 'Loading...' : 'SIGN IN'}</button>
            <OAuth />
          </div>


          <div className="flex text-gray-800 mt-6 gap-3">
            Dont have an account?
            <Link to='/SignUp' className="no-underline border-b border-blue text-blue-500" href="../login/">
              Sign up
            </Link>.
          </div>
          <p className='text-red-500'>{error ? (typeof error === 'string' ? error : 'Something went wrong!!') : ''}</p>

        </div>
      </form>
    </div>
  )
}

export default SignIn