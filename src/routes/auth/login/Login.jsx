import React from 'react'
import { Button, Typography, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { logIn } from '../../../redux/slice/authSlice';
import { useUserLoginMutation } from '../../../redux/api/authApi';

const { Text, Title } = Typography;

// Function to generate a custom token (this is a simple example)
const generateCustomToken = () => {
  return 'custom-token-' + Math.random().toString(36).substr(2);
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginRequest, { data, isLoading, isSuccess, isError, error }] = useUserLoginMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setIsSubmitting(true);
    loginRequest(values)
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSubmitting(false);
      const customToken = generateCustomToken();

      // Dispatch the custom token to Redux and store it in localStorage
      dispatch(logIn({ token: customToken }));
      localStorage.setItem('token', customToken);

      notification.success({
        message: "Successfully logged in! Go ahead 😊",
      });

      navigate("/");
    }

    if (isError) {
      setIsSubmitting(false);
      notification.error({
        message: "Login failed!",
        description: error?.data?.message || "An error occurred during login. Please try again.",
      });
    }
  }, [isSuccess, isError, data, error, dispatch, navigate]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
      <Title level={2} className="text-center">
        Login
      </Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
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
          {isSubmitting || isLoading ? "Loading..." : "Login"}
        </Button>
      </Form.Item>
      <Text>Don't have an account? <Link to="/auth/signup">Sign Up</Link></Text>
    </Form>
  )
}

export default Login