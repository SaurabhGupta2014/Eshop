import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import { fireproducts } from '../firecommerce-products';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Homepage(props) {

    const [products, setProducts] = useState([]);
    const [loading , setLoading] = useState(false);
    const {cartItems} = useSelector(state=>state.cartReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [searchKey, setSearchKey] = useState('');
    const [filterType, setFilterType] = useState('');


    useEffect(() => {
        getdata();
    }, []);

    async function adddata() {

        try {
            await addDoc(collection(fireDB, "users"), { name: 'baby', age: 1 });
        } catch (error) {
            console.log(error);
        }
        // fireDB is the name of database which we have created in fireConfig file
        // users is the name of collection in ehich we want to sotre data (TABLE)
        // secound argument is the data which we wanna store

    }

    async function getdata() {
        
        try {
            setLoading(true);
            const products = await getDocs(collection(fireDB, "products"));
            const productsArray = []; // we will store all data in a array
            products.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
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
        // fireDB is the name of database which we have created in fireConfig file
        // users is the name of collection in which we want to add or retrieve data (TABLE)
        // getDocs is used to getdata 's' is impo


    }


    // ADD INITIAL PRODUCTS TO DATABASE

    // function addProductData(){
    //     fireproducts.map(async (product)=>{
    //         try {
    //             await addDoc(collection(fireDB, "products"), product);
    //             console.log("ADDED SUCCESSFULLY");
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // }
   
    useEffect(()=>{
        localStorage.setItem('cartItems' ,JSON.stringify(cartItems));
    },[cartItems]);

    const addToCart=(product)=>{
        dispatch({type : 'ADD_TO_CART' , payload : product})
    }


    return (
        <Layout loading={loading}>
            <div className='container'>
            {/* <button onClick={()=>addProductData()}>ADD</button> */}
                <div className='d-flex w-50 my-3 '>
                    <input type='text' value={searchKey} 
                    placeholder='search items' 
                    className='form-control mx-2'
                    onChange={e=>setSearchKey(e.target.value)}
                    />
                    <select className='form-control mt-3'
                            value={filterType}
                            onChange={e=>setFilterType(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="fashion">Fashion</option>
                    </select>
                </div>
                <div className='row'>
                    {
                        products.filter(obj=>obj.name.toLowerCase().includes(searchKey))
                        .filter(obj=>obj.category.toLowerCase().includes(filterType))
                        .map((product) => {
                            return (
                                <div className='col-md-4'>
                                    <div className='m-2 p-1 product position-relative curve'>
                                        <div className='product-content'>
                                            <p>{product.name}</p>
                                            <div className='text-center'>
                                                <img src={product.imageURL} alt="" className='product-img' />
                                            </div>
                                        </div>
                                        <div className='product-actions curve'>
                                            <h2>{product.price} RS/-</h2>
                                            <div className='d-flex'>
                                                <button className='mx-2' onClick={()=>addToCart(product)}>ADD TO CART</button>
                                                <button onClick={()=>navigate(`/productinfo/${product.id}`)}>VIEW</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </Layout>
    );
}

export default Homepage;