import React from 'react'
import { Container } from '../../utils'

const NotFound = () => {
  return (
    <div>
      <Container>
        <div className='h-screen flex items-center justify-center'>
          <div className='flex flex-col gap-4 items-center border border-black p-4 rounded-xl transition-all hover:scale-125  hover:bg-red-600 hover:text-white hover:border-none'>
            <h1>Page Not Found</h1>
            <h1>404</h1>
            <p>The page you are looking for does not exist?</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NotFound