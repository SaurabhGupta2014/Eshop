import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { FaTrash, FaEdit } from 'react-icons/fa';
import fireDB from '../fireConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AdminPage(props) {

    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});


    async function getdata() {

        try {
            setLoading(true);
            const products = await getDocs(collection(fireDB, "products"));
            const productsArray = [];
            products.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data()
                };
                productsArray.push(obj);
                setLoading(false);
            });

            setProducts(productsArray);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    useEffect(() => {
        getdata();
    }, []);


    async function getOrdersdata() {
        
        try {
            setLoading(true);
            const orders = await getDocs(collection(fireDB, "orders"));
            const ordersArray = []; // we will store all data in a array
            orders.forEach((doc) => {
                ordersArray.push(doc.data());
            });
            setLoading(false);
            setOrders(ordersArray);
            
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
 }

 useEffect(() => {
    getOrdersdata();
}, []);


    const editHandler = (item) => {
        setProduct(item);
        setShow(true);
    }
    const addHandler = () => {
        setAdd(true);
        handleShow();
    }

    const updateProduct = async () => {
        try {
            setLoading(true);
            await setDoc(doc(fireDB, 'products', product.id), product);
            toast.success('product updated successfully');
            window.location.reload();
            handleClose();
        } catch (error) {
            toast.error('product update failed');
            setLoading(false);
        }
    }

    const addProduct = async () => {
        try {
            setLoading(true);
            await addDoc(collection(fireDB, 'products'), product);
            toast.success('product added successfully');
            window.location.reload();
            handleClose();
        } catch (error) {
            toast.error('product add failed');
            console.log(error);
            setLoading(false);
        }
    }

    const deleteProduct = async (item) => {
        try {
            setLoading(true);
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success('product deleted successfully');
            getdata();
            handleClose();
        } catch (error) {
            toast.error('product delete failed');
            setLoading(false);
        }
    }



    return (
        <Layout loading={loading}>
            <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="products" title="Products">
                    <div className='d-flex justify-content-between'>
                        <h3>Product List</h3>
                        <button onClick={addHandler}>Add Product</button>
                    </div>


                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => {
                                return <tr>
                                    <td><img src={item.imageURL} height="80" width="80"></img></td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <FaTrash onClick={() => deleteProduct(item)} color='red' size={20} />
                                        <FaEdit onClick={() => editHandler(item)} color='blue' size={20} />
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{add ? 'Add a Product' : 'Edit Product'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='register-form'>

                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Name' value={product.name}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='ImageURL' value={product.imageURL}
                                    onChange={(e) => setProduct({ ...product, imageURL: e.target.value })}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Price' value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                />
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Category' value={product.category}
                                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                />



                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleClose}>
                                Close
                            </button>
                            {add
                                ? <button onClick={addProduct}>Save</button>
                                : <button onClick={updateProduct}>Save</button>
                            }
                        </Modal.Footer>
                    </Modal>
                </Tab>
                <Tab eventKey="orders" title="Orders">
                  {orders.map(order=>{
                   return <table className='table mt-3 order'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cartItems.map(item => {
                            return <tr>
                                <td><img src={item.imageURL} height="80" width="80"></img></td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            })
            }
                </Tab>
                <Tab eventKey="contact" title="users" >

                </Tab>
            </Tabs>


        </Layout>
    );
}

export default AdminPage;