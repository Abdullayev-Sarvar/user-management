import { useEffect, useState } from 'react';
import { Container } from '../../utils'
import { Button, Form, Input, Typography, notification } from 'antd';
import { useCreateUserMutation } from '../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CreateUser = () => {
    const [createUser, { isLoading }] = useCreateUserMutation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFinish = (values) => {
        setIsSubmitting(true);
        createUser(values);
    };

    useEffect(() => {
        if (isSubmitting && !isLoading && !createUser.isError) {    
            notification.success({
                message: "User created successfully 👤",
                duration: 3,
            })
            setIsSubmitting(false);
            navigate('/');
        }
    }, [isSubmitting, isLoading, createUser, navigate]);

    const onFinishFailed = (errorInfo) => {
        setIsSubmitting(false);
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Container>
                <div className='h-screen flex items-center justify-center'>
                    <div className='w-[350px] shadow-2xl rounded-lg'>
                        <Form
                            className="p-4 w-full"
                            name="basic"
                            layout="vertical"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Title level={2} className="text-center pb-3">
                                Create a new user!
                            </Title>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Job"
                                name="job"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your job!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    className="w-full"
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isSubmitting || isLoading}
                                >
                                    {isSubmitting || isLoading ? "Creating..." : "Create"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CreateUser