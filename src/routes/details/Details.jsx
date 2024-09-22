import { HiOutlineMail } from "react-icons/hi";
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../../utils';
import { useDetailsUserQuery, useDeleteUserMutation } from '../../redux/api/userApi';
import { Button, Spin, Alert, Image, notification } from 'antd';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useDetailsUserQuery(id);
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            notification.success({
                message: 'User deleted successfully',
                duration: 3,
            })
            await deleteUser(id).unwrap();
            window.history.back();
            navigate('/')
        } catch (err) {
            notification.error({
                message: 'Failed to delete user',
                description: err.message || 'Something went wrong. Please try again.',
            })
        }
    };

    const handleGoBack = () => {
        setIsButtonLoading(true);
        setTimeout(() => {
            window.history.back();
        }, 1000);
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Alert message="Error" description="Failed to load user details" type="error" showIcon />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Alert message="No Data" description="No user details found" type="warning" showIcon />
            </div>
        );
    }

    return (
        <div>
            <Container>
                <div className='h-screen flex items-center justify-center'>
                    <div className="h-[300px] flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden">
                        <div className='h-full w-[460px] flex flex-col justify-center items-center p-4'>
                            <div className='flex flex-col gap-4 mb-10'>
                                <h1 className="text-3xl font-semibold text-gray-700">{data.data.first_name} {data.data.last_name}</h1>
                                <p className="flex items-center gap-2"><strong><HiOutlineMail /> </strong> {data.data.email}</p>
                                <p>No more information!</p>
                            </div>
                            <div className="flex gap-2">
                                <Button type="primary" className="px-4 py-2 text-base" onClick={handleGoBack} loading={isButtonLoading}>
                                    Go Back
                                </Button>
                                <Button type="primary" danger className="px-4 py-2 text-base" onClick={() => handleDelete(id)} loading={isDeleting}>Delete User!</Button>
                            </div>
                        </div>
                        <div primary className='bg-green-600 h-full w-[140px] relative'>
                            <Image width={180} className="w-full rounded-full absolute top-12 -left-2/4 border-4 border-white cursor-pointer transition-all hover:scale-110 hover:border-none" src={data.data.avatar} alt={`${data.data.first_name} ${data.data.last_name}`} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Details;
