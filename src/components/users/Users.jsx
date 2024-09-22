import { BsFillTrashFill } from "react-icons/bs";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useGetUserQuery, useDeleteUserMutation } from '../../redux/api/userApi';
import { Container } from '../../utils';
import { notification, Button } from "antd";
import { NavLink } from "react-router-dom";

const Users = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useGetUserQuery(page);
    const [users, setUsers] = useState([]);
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    useEffect(() => {
        if (data && data.data) {
            setUsers((prevUsers) => [...prevUsers, ...data.data]);
        }
    }, [data]);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id).unwrap();
            notification.success({
                message: "User deleted successfully",
            });
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        } catch (err) {
            notification.error({
                message: "Failed to delete user",
                description: err.message || "Something went wrong. Please try again.",
            });
        }
    };

    const handleLike = (id) => {
        notification.success({
            message: "User liked successfully 👍"
        });
    };

    const handleDislike = (id) => {
        notification.success({
            message: "User disliked successfully 👎",
        });
    };

    const loadMoreUsers = () => {
        setPage((prevPage) => (prevPage === 2 ? 1 : prevPage + 1));
    };

    if (isLoading) {
        return <div className="h-screen flex items-center justify-center"><div className="loader"></div></div>;
    }

    if (error) {
        return <div className="h-screen flex items-center justify-center">Something went wrong...</div>;
    }

    if (!data || !Array.isArray(data.data)) {
        return <div>No users found or data format is incorrect</div>;
    }

    return (
        <div>
            <Container>
                <div className='flex flex-wrap justify-evenly gap-10 px-4 my-8'>
                    {data.data.map((user) => (
                        <div key={user.id} className='w-[300px] flex flex-col items-start gap-4 border border-gray-200 rounded-xl overflow-hidden transition-all hover:scale-100'>
                            <div className='w-full p-4'>
                                <h1 className='text-2xl font-semibold py-5'>{user.first_name} {user.last_name}</h1>
                                <p>{user.email}</p>
                                <p>{user.name}</p>
                                <div className="flex justify-between py-2">
                                    <div className="flex gap-4">
                                        <button onClick={() => handleLike(user.id)} disabled={isLoading} className="text-lg" ><AiFillLike className="text-sky-600" /></button>
                                        <button onClick={() => handleDislike(user.id)} disabled={isLoading} className="text-lg" ><AiFillDislike className="text-red-600" /></button>
                                    </div>
                                    <button
                                        className="text-lg"
                                        onClick={() => handleDelete(user.id)}
                                        disabled={isDeleting}
                                    >
                                        <BsFillTrashFill className="text-red-600" />
                                    </button>
                                </div>
                            </div>
                            <NavLink className='w-full h-full' to={`/details/${user.id}`}>
                                <img className='w-full h-full transition-all hover:scale-110' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                            </NavLink>
                        </div>
                    ))}
                </div>
                <div className="text-center my-10">
                    <Button onClick={loadMoreUsers} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Users;
