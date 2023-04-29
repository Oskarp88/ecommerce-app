import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/AuthStyles.css';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: ''
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setInput({
        ...input,
       [e.target.name]: e.target.value
    })
  }
  const {name,email,password,phone,address,answer} = input;
  const handelSubmit = async(e) =>{
     e.preventDefault();
     try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{
            name,
            email,
            password,
            phone,
            address,
            answer
        });

        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setTimeout(()=>{
                navigate('/login');
            }, 4000)
        }else{
            toast.error(res.data.message);
        }
     } catch (error) {
        console.log(error);
        toast.error(`Something went wrong ${error}`)
     }
     
  }

  return (
    <Layout title={'Register - Ecommerce APP'}>
        <div className='form-container'>
          <form onSubmit={handelSubmit}>
            <h4 className='title'>REGISTER FORM</h4>
            <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  value={name}
                  name="name" 
                  placeholder='Enter your Name'
                  onChange={(e)=>handleChange(e)}
                  required
                  autoFocus
                />
            </div>
            <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  value={email}
                  name="email" 
                  placeholder='Enter your Email'
                  onChange={(e)=>handleChange(e)}
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
                  onChange={(e)=>handleChange(e)}
                  required
                />
            </div>
            <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control"
                  value={phone} 
                  name="phone"
                  placeholder='Enter your Phone'
                  onChange={(e)=>handleChange(e)}
                  required 
                />
            </div>
            <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  value={address}
                  name="address" 
                  placeholder='Enter your Address'
                  onChange={(e)=>handleChange(e)}
                  required
                />
            </div>
            <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  value={answer}
                  name="answer" 
                  placeholder='What is Your Favorite sports'
                  onChange={(e)=>handleChange(e)}
                  required
                />
            </div>
            <button type="submit" className="btn btn-primary">REGISTER</button>
          </form>
        </div>
    </Layout>
  )
}

export default Register