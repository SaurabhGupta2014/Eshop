import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
function LoginPage(props) {

    const auth = getAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const login=async()=>{
        try {
            setLoading(true);
            const result =await signInWithEmailAndPassword (auth, email, password);
            localStorage.setItem('currentUser' , JSON.stringify(result));
            setLoading(false);

            toast.success('Login Successfull');
            window.location.href='/'; 
        } catch (error) {
            toast.error('Login failed!');
            setLoading(false);
        }
    }

    return (
        <div className='login-parent'>
            {loading && <Loader/>}
            <div className='login-bottom'></div>

            <div className='row justify-content-center'>

            <div className='col-md-5 z1'>
                    <div className='login-form'>
                        <h1>Login</h1>
                        <hr />
                        <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        
                        <button className='mt-3' onClick={login}>LOGIN</button>
                        <hr/>
                        <Link to='/register'>Click here to Register</Link>
                    </div>

                </div>
                <div className='col-md-5'>
                    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_pm5qdb4j.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay></lottie-player>
                </div>
               
            </div>
        </div>
    );
}

export default LoginPage;