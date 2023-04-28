import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  
  const handleChange = (e) => {
    setInput({
        ...input,
       [e.target.name]: e.target.value
    })
  }
  const {name,email,password,phone,address} = input;
  const handelSubmit = (e) =>{
     e.preventDefault();
     console.log(name,email,password,phone,address);
     toast.success('Register Successfully')
  }
  return (
    <Layout title={'Register - Ecommerce APP'}>
        <div className='register'>
          <h1>Register Page</h1>
          <form onSubmit={handelSubmit}>
            <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  value={input.name}
                  name="name" 
                  placeholder='Enter your Name'
                  onChange={(e)=>handleChange(e)}
                  required
                />
            </div>
            <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  value={input.email}
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
                  value={input.password}
                  onChange={(e)=>handleChange(e)}
                  required
                />
            </div>
            <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control"
                  value={input.phone} 
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
                  value={input.address}
                  name="address" 
                  placeholder='Enter your Address'
                  onChange={(e)=>handleChange(e)}
                  required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    </Layout>
  )
}

export default Register