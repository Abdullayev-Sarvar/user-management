import { MdOutlineAppRegistration } from "react-icons/md";
import { CgLogIn } from "react-icons/cg";
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { notification, Modal, Button } from 'antd';
import { logOut } from "../../redux/slice/authSlice";

const Navigation = () => {
    const { pathname } = useLocation();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dispatch(logOut());
        notification.success({
            message: 'Logged out successfully',
        });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (pathname.includes("auth")) return null;

    return (
        <div className='bg-black'>
            <Container>
                <div className='flex items-center justify-between px-10 py-2 shadow-2xl'>
                    <NavLink to="/">
                        <img className='w-[60px] rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" alt="Home" />
                    </NavLink>
                    <ul className='flex items-center gap-6 text-white'>
                        {
                            token ? (
                                <>
                                    <li>
                                        <button onClick={showModal}>Log Out</button>
                                    </li>
                                    < li className = "w-12" >
                                        <NavLink className='w-10 flex items-center gap-1' to='/create'><img className="rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/000/379/162/small/Universal__28137_29.jpg" alt="" /></NavLink>
                                    </li >
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink className='flex items-center gap-1' to='/auth/signup'><MdOutlineAppRegistration className="text-lg" />Sign Up</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-1' to='/auth/login'><CgLogIn className="text-lg" /> Login</NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </Container>
            <Modal
                title="Log Out"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={false} onClick={handleOk}>
                        Yes
                    </Button>,
                ]}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>
        </div>
    );
}

export default Navigation;