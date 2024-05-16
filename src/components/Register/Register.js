// components/Register.jsx

import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {motion} from 'framer-motion';
import {useAuth} from "@/context/AuthContext";

const Register = ({onClose}) => {  // Accept onClose prop    const [form] = Form.useForm();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const {register} = useAuth(); // Use the register function from the context
    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await fetch('/api/register', {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Registration successful! You can now log in.');
                form.resetFields();

                // Close if onClose is provided
                if (onClose) {
                    onClose();
                } else {
                    // Handle case where onClose is not provided (e.g., standalone component)
                    // You could redirect to the login page, display a message, etc.
                }
            } else {
                const errorData = await response.json();
                message.error(errorData.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            message.error('An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (<motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="container mx-auto mt-8 p-4 max-w-md"
    >
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input prefix={<UserOutlined/>} placeholder="Username"/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please input your email!'}, {
                    type: 'email', message: 'Please enter a valid email!'
                },]}
            >
                <Input prefix={<MailOutlined/>} placeholder="Email"/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
            </Form.Item>

            {/* You can add more fields here as needed (e.g., confirm password) */}

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Register
                </Button>
            </Form.Item>
        </Form>
    </motion.div>);
};

export default Register;
