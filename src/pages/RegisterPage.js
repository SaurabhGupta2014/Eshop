import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
function RegisterPage(props) {

    const auth = getAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cpassword, setCPassword] = useState();
    const [loading, setLoading] = useState(false);

    const register=async()=>{
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
            setLoading(false);
            toast.success('Registration Successfull');
            setCPassword('');
            setPassword('');
            setEmail('');
        } catch (error) {
            toast.error('Registration failed!');
            setLoading(false);
        }
    }

    return (
        <div className='register-parent'>

            <div className='register-top'></div>
            {loading && <Loader/>}

            <div className='row justify-content-center'>
                <div className='col-md-5'>
                    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_pm5qdb4j.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay></lottie-player>
                </div>
                <div className='col-md-5 z1'>
                    <div className='register-form'>
                        <h1>Register</h1>
                        <hr />
                        <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type='password' className='form-control' placeholder='Confirm Password' value={cpassword} onChange={(e) => setCPassword(e.target.value)} />

                        <button className='mt-3' onClick={register}>REGISTER</button>
                        <hr/>
                        <Link to='/login'>Click here to Login</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RegisterPage;