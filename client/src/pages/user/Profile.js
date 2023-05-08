import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Profile = () => {

  const [auth, setAuth] = useAuth();

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: ''
  });

  //GET user data
  useEffect(()=>{
    const {email, name, phone, address} = auth?.user;
    setInput({
      ...input,
      name,
      email,
      address,
      phone
    })
  },[auth?.user])
  
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
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{
            name,
            email,
            password,
            phone,
            address,
            answer
        });

        if(data?.success){
            toast.success(data.message);
            setAuth({...auth, user: data?.updateUser})
            let ls = localStorage.getItem('auth');
            ls = JSON.parse(ls);
            ls.user = data.updateUser;
            localStorage.setItem('auth', JSON.stringify(ls));
        }else{
            toast.error(data?.error);
        }
     } catch (error) {
        console.log(error);
        toast.error(`Something went wrong ${error}`)
     }
     
  }


  return (
    <Layout title={'Your Profile'}>
        <div className='container-flui p-3 m-3 dashboard'>
            <div className='row'>
               <div className='col-md-3'>
                 <UserMenu/>
               </div>
               <div className='col-md-9'>
                  <div className='form-container'>
                    <form onSubmit={handelSubmit}>
                      <h4 className='title'>USER PROFILE</h4>
                      <div className="mb-3">
                          <input 
                            type="text" 
                            className="form-control" 
                            value={name}
                            name="name" 
                            placeholder='Enter your Name'
                            onChange={(e)=>handleChange(e)}
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
                            disabled
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
                          />
                      </div>
                      <button type="submit" className="btn btn-primary">UPDATE</button>
                    </form>
                  </div>
               </div>
            </div>
        </div>
        
    </Layout>
  )
}

export default Profile