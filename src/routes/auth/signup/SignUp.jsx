import React, { useState, useEffect } from 'react';
import { Button, Typography, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../redux/slice/authSlice';
import { useUserSignUpMutation } from '../../../redux/api/authApi';

const { Text, Title } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpRequest, { data, isLoading, isSuccess, isError, error }] = useUserSignUpMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setIsSubmitting(true);
    signUpRequest(values);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSubmitting(false);
      if (data?.payload?.token) {
        dispatch(signUp({ token: data.payload.token }));
      }
      if (data.status !== 200) {
        notification.success({
          message: "Successfully logged up! Go and login 😊",
        });
        navigate("/auth/login");
      } else {
        setIsSubmitting(false);
        notification.error({
          message: "Error sign up. Please try again.",
        });
      }
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
        Sign Up
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
          {isSubmitting || isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </Form.Item>
      <Text>Already have an account? <Link to="/auth/login">Log in</Link></Text>
    </Form>
  );
};

export default SignUp;