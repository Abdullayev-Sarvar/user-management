import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Container } from '../../utils'
import { useSelector } from 'react-redux' 

const Navigation = () => {
    const { pathname } = useLocation();
    const { token } = useSelector((state) => state.auth)

    if (pathname.includes("auth")) return null;
    return (
        <div className='bg-black'>
            <Container>
                <div className='flex items-center justify-between px-10 py-2 shadow-2xl'>
                    <NavLink to="/">
                        <img className='w-[60px] rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" alt="" />
                    </NavLink>
                    <ul className='flex items-center gap-6 text-white'>
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        {
                            token ? (
                                <li className='w-[40px]'>
                                    <NavLink to='/profile'>
                                        <img className='w-[50px] rounded-full shadow-lg' src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="" />
                                    </NavLink>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to='/auth/signup'>Sign Up</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/auth/login'>Login</NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </Container>
        </div>
    )
}

export default Navigation