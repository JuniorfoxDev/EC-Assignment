import React from 'react'
import { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegsiter = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://intern-task-api.bravo68web.workers.dev/auth/signup',{
        method:'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if(response.ok){
        setSuccess('Register success!');
        setError('');
        setTimeout(() => {
          window.location.href = '/login';
        },2000);
      }else{
        setSuccess('');
        setError(data.message || "Registration failed.")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen flex justify-center items-center bg-blue-200'>
      <form className='bg-white p-8 rounded shadow-md w-96' onSubmit={handleRegsiter}>
        <h2 className='text-2xl font-bold mb-6'>Register</h2>
        {error && <p className='text-red-600 mb-4'>{error}</p>}
        {success && <p className='text-green-600 mb-4'>{success}</p>}
        <div className='mb-4'>
          <label className='block text-gray-900'>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-900'>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required/>
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Register</button>
      </form>
    </div>
  )
}

export default Register