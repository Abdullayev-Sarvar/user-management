import React from 'react'
import { Container } from '../../utils'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <Container>
            <div className='flex items-center justify-center'>
                <div className='flex items-center justify-around border border-black p-4 rounded-xl transition-all hover:scale-125  hover:bg-red-600 hover:text-white hover:border-none'>
                    <ul className='flex gap-8'>
                        <li className='transition-all hover:scale-95 hover:text-black'>
                            <Link to='https://github.com/Abdullayev-Sarvar/user-management'>Demo Link</Link>
                        </li>
                        <div className='border border-gray-700'></div>
                        <li className='transition-all hover:scale-95 hover:text-black'>
                            <Link to='https://github.com/Abdullayev-Sarvar'>My GitHub Profile</Link>
                        </li>
                        <div className='border border-gray-700'></div>
                        <li className='transition-all hover:scale-95 hover:text-black'>
                            <Link to='https://www.linkedin.com/in/sarvar-abdullayev-bbb2032b8/'>My LinkedIn Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default About