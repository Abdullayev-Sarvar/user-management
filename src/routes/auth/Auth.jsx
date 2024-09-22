import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-500'>
      <div className='max-w-[400px] flex-1 flex flex-col items-center bg-white border border-gray-200 rounded-lg'>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth