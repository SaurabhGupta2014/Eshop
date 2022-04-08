import { computeHeadingLevel } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';

import {addDoc , collection} from 'firebase/firestore';
import { toast } from 'react-toastify';
import fireDB from '../fireConfig';


function CartPage(props) {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer);
    const [totalAmount, setTotalAmount] = useState(0);

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [pincode, setPincode] = useState();
    const [phonenumber, setPhoneNumber] = useState();
    const [loading, setLoading] = useState(false);
    
    const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let temp = 0;
        cartItems.forEach(cartItem => {
            temp = temp + parseInt(cartItem.price);
        });
        setTotalAmount(temp);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const deleteFromCart = product => {
        dispatch({ type: 'DELETE_FROM_CART', payload: product });
    };


    async function placeOrder(){
       
        const addressInfo = {
            name,
            address,
            pincode,
            phonenumber
        }
        
        const orderInfo={
            cartItems ,
            addressInfo ,
            email : JSON.parse(localStorage.getItem('currentUser')).user.email,
            userid : JSON.parse(localStorage.getItem('currentUser')).user.uid
        }
       

        try{
            setLoading(true);
            await addDoc(collection(fireDB ,"orders") , orderInfo);
            toast.success('order placed successfully!');
            setLoading(false);
            handleClose();
        } catch (error) {
            toast.error('order failed!');
            setLoading(false);
        }
    };

    return (
        <Layout loading={loading}>
            <table className='table mt-3'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => {
                        return <tr>
                            <td><img src={item.imageURL} height="80" width="80"></img></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><FaTrash onClick={() => deleteFromCart(item)} /></td>

                        </tr>
                    })}
                </tbody>
            </table>
            <div className='d-flex justify-content-end'>
                <h1 className='total-amount'> Total Amount = {totalAmount} Rs/-</h1>
            </div>
            <div className='d-flex justify-content-end m-3'>
                <button onClick={handleShow}>PLACE ORDER</button>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='register-form'>
                        <h1>Register</h1>
                        <hr />
                        <input type='text'className='form-control' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <textarea type='text' rows={3} className='form-control' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
                        <input type='number' className='form-control' placeholder='Pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        <input type='number' className='form-control' placeholder='PhoneNumber' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button  onClick={handleClose}>
                        Close
                    </button>
                    <button  onClick={placeOrder}>
                        ORDER
                    </button>
                </Modal.Footer>
            </Modal>
        </Layout>


    );
}

export default CartPage;