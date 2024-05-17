import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useCart } from "@/context/CartContext";

const Checkout = () => {
    const [form] = Form.useForm();
    const { cartItems, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token"); // Replace with your JWT token
            const apiUrl = '/api/checkout'; // Assuming your API endpoint is at /api/checkout

            console.log("Here are the values ", values);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cart: cartItems,
                    customerInfo: values, // No need to parse values, it's already an object
                }),
            });

            if (!response.ok) {
                throw new Error('Error placing order. Please try again.');
            }

            message.success('Order placed successfully!');
            clearCart(); // Clear the cart after successful checkout
        } catch (error) {
            message.error(error.message || 'Error placing order. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your address!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Payment Method"
                    name="paymentMethod"
                    rules={[{ required: true, message: 'Please select a payment method!' }]}
                >
                    {/* Replace with your actual payment method options (e.g., dropdown or radio buttons) */}
                    <Input placeholder="Select payment method" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading}>
                    Place Order
                </Button>
            </Form>
        </div>
    );
};

export default Checkout;
