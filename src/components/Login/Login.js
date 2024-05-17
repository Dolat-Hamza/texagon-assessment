// components/Login.jsx

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { motion } from 'framer-motion';
import {AiFillLock, AiOutlineLock, AiOutlineUser} from "react-icons/ai";
import {useAuth} from "@/context/AuthContext";

const Login = ({onClose}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const success = await login(values); // Replace with your authentication logic
            console.log(success)
            if (onClose) {
                onClose();
            }
        } catch (error) {
            message.error('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Simulate login for demonstration purposes (replace with your actual logic)
    const simulateLogin = (values) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(values.username === 'user' && values.password === 'password'); // Simulate success for 'user' and 'password'
            }, 1000); // Simulate a 1-second delay
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto mt-8 p-4 max-w-md"
        >
            <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Username"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<AiOutlineUser />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<AiOutlineLock />} placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Log in
                    </Button>
                </Form.Item>

                {/* Optionally, you can add a "Forgot Password" link here */}
            </Form>
        </motion.div>
    );
};

export default Login;
