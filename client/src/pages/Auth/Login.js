import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {

const [auth, setAuth] = useAuth();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const location = useLocation();

 const handelSubmit = async(e) =>{
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
            email,
            password,
        });

        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            })
            localStorage.setItem('auth', JSON.stringify(res.data))
            setTimeout(()=>{
                navigate(location.state || '/');
            }, 2000)
            
        }else{
            toast.error(res.data.message);
        }
     } catch (error) {
        console.log(error);
        toast.error(`Something went wrong ${error}`)
     }
 }
  return (
    <Layout>
        <div className='form-container'>
          <form onSubmit={handelSubmit}>
            <h4 className='title'>LOGIN</h4>
            <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  value={email}
                  name="email" 
                  placeholder='Enter your Email'
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
            </div>
            <div className="mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  name="password"
                  placeholder='Enter your Password'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
            </div>
            <div className='mb-3'>
              <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
            </div>
            <button type="submit" className="btn btn-primary">LOGIN</button>
          </form>
        </div>
    </Layout>
  )
}

export default Login