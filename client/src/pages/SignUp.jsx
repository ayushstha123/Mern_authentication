import React from 'react'
import {Link} from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
      <div class="bg-gray-100 min-h-screen flex flex-col">
        <div class="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl font-semibold text-center">Sign Up</h1>
            <input
              type="text"
              class="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              name="username"
              placeholder="username" />

            <input
              type="text"
              class="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              name="email"
              placeholder="email" />

            <input
              type="password"
              class="block border border-gray-200 focus:border-white w-full p-3 rounded mb-4"
              name="password"
              placeholder="password" />


            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1"
            >Create Account</button>

            <button
              type="submit"
              class="w-full text-center py-3 rounded bg-red-500 text-white hover:bg-red-400 focus:outline-none my-1"
            >Sign-in with Google</button>


          </div>

          <div class="flex text-gray-800 mt-6 gap-3">
            Already have an account?
            <Link to='/SignIn' class="no-underline border-b border-blue text-blue-500" href="../login/">
              Log in
            </Link>.
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp