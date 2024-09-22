import React from 'react'
import { Container } from '../../utils'
import './Banner.css'

const Banner = () => {
  return (
    <div className='my-6'>
      <Container>
        <div className='banner text-white flex items-center justify-center'>
          <div>
            <h1 className='text-center text-4xl font-bold'>Welcome to my website!</h1>
            <br />
            <p className='text-center text-xl'>I will provide you with the best services in the world.</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Banner