import {Button, InputNumber, List, Modal} from 'antd';
import {AiOutlineClose} from "react-icons/ai";
import {useCart} from "@/context/CartContext";
import {useState} from "react";
import Checkout from "@/components/Products/Checkout";

const cartItemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -20},
};

const Cart = ({visible, onCancel, onRemoveItem}) => {
    const {cartItems, removeFromCart, updateItemQuantity, clearCart, getCartItem} = useCart(); // Access updateItemQuantity
    const [checkout, setCheckout] = useState(false);

    const handleChangeQuantity = (itemId, newQuantity) => {
        updateItemQuantity(itemId, newQuantity);
    };
    console.log(getCartItem)
    return (
        <Modal

            title="Shopping Cart"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="close" onClick={onCancel}>
                    Close
                </Button>,
                <Button onClick={()=>setCheckout(true)} key="checkout" type="primary" disabled={cartItems.length === 0}>
                    Checkout
                </Button>,
                <Button key="clear" onClick={clearCart}>
                    Clear Cart
                </Button>
            ]}
        >
            <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                    <List.Item>

                            <div className={"flex flex-row gap-6 items-center justify-between w-full "}>
                                <img src={item.thumbnail} width={200} className={"rounded-2xl"}/>
                                <div className={"capitalize flex flex-col gap-3"}>
                                    <h2 className="text-2xl font-sans mb-2 font-semibold">{item.title}</h2>
                                    <p className="text-gray-600 mb-2"><span
                                        className={"font-bold"}>Price: </span>$ {item.price}</p>
                                    <div className={"flex flex-row gap-2"}><h1 className={"font-bold"}>Brand:</h1>
                                        <p>{item.brand}</p>
                                    </div>
                                    <div className={"flex flex-row gap-2"}><h1 className={"font-bold"}>Stock
                                        Available</h1>
                                        <p>{item.stock}</p></div>
                                    <div className={"flex flex-row gap-2"}><h1 className={"font-bold"}>Category</h1>
                                        <p>{item.category}</p></div>
                                    <h1 className={"font-bold"}>Product Description:</h1>
                                    <p className="text-sm text-gray-500">
                                        {item.description}
                                    </p>
                                    <div className={"flex flex-row gap-2 items-center justify-end w-full"}>
                                        <h1>Quantity Selected:</h1>
                                        <InputNumber min={1} defaultValue={item.quantity}
                                                     onChange={(value) => handleChangeQuantity(item.id, value)}/>
                                        <AiOutlineClose
                                            onClick={() => removeFromCart(item.id)}
                                            style={{cursor: 'pointer'}}
                                        />
                                    </div>
                                </div>
                            </div>





                    </List.Item>
                )}
            />
            <Modal open={checkout} onCancel={ () => setCheckout(false)} footer={null}>
                <Checkout onCancel={ () => setCheckout(false)}/>
            </Modal>
        </Modal>
    );
};
export default Cart;