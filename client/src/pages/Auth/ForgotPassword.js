import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();


    const handelSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
                email,
                newPassword,
                answer
            });

            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setTimeout(()=>{
                    navigate('/login');
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
    <Layout title={'Forgot Password - Ecommerce APP'}>
      <div className='form-container'>
          <form onSubmit={handelSubmit}>
            <h4 className='title'>Forgot Password</h4>
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
                  type="text" 
                  className="form-control" 
                  value={answer}
                  name="answer" 
                  placeholder='Enter your Secret Answer'
                  onChange={(e)=>setAnswer(e.target.value)}
                  required
                />
            </div>
            <div className="mb-3">
                <input 
                  type="newPassword" 
                  className="form-control" 
                  name="password"
                  placeholder='Enter your New Password'
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  required
                />
            </div>
            <button type="submit" className="btn btn-primary">REGISTER</button>
          </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword