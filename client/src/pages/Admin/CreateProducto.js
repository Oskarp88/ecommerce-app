import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';

const CreateProducto = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantify, setQuatify] = useState('');
  const [shipping, setShipping] = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

   //get all cat
   const getAllCategory = async () => {
    try {
       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);
       if(data.success){
          setCategories(data.category);
       }
      } catch (error) {
      console.log(error);
      toast.error(`Something wwent wrong in getting category`);
    }
  }

  useEffect(()=>{
    getAllCategory();
    
  },[]);

  const handleCreate = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantify', quantify);
      productData.append('photo', photo);
      productData.append('category', category);
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
      if(data?.success){
        toast.success(`${name} is created`);
        setTimeout(()=>{
          navigate('/dashboard/admin/products')
        },2000);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }
   
  return (
    <Layout title={'Dashboard - Create Product'}>
        <div className='container-fluid m-3 p-3 dashboard'>
            <div className='row'>
                <div className='col-md-3'>
                  <AdminMenu/>
                </div>
                <div className='col-md-9'>
                   <h1>Create Product</h1>
                   <div className='m-1'>
                       <Select 
                         bordered={false} 
                         placeholder='Select a category' 
                         size='large' 
                         showSearch
                         className='form-select mb-3'
                         onChange={(value) => {setCategory(value)}}
                       >
                          {categories?.map(c => (
                            <Option key={c._id} value={c._id}>
                              {c.name}
                            </Option>
                          ))}
                       </Select>
                       <div className='mb-3'>
                         <label className='btn btn-outline-secondary col-md-12'>
                           {photo ? photo.name : 'Upload Photo'} 
                          <input 
                            type='file' 
                            name='photo'
                            accept='image/*'
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                          />
                         </label>                        
                       </div>
                       <div className='mb-3'>
                          {photo && (
                            <div className='text-center'>
                              <img 
                               src={URL.createObjectURL(photo)} 
                               alt='product-photo' 
                               height={'200px'}
                               className='img img-responsive'
                              />
                            </div>
                          )}
                       </div>
                       <div className='mb-3'>
                          <input 
                            type='text'
                            value={name}
                            placeholder='write a name'
                            className='form-control'
                            onChange={(e)=> setName(e.target.value)}
                          />
                       </div>
                       <div className='mb-3'>
                          <textarea 
                            type='text'
                            value={description}
                            placeholder='write a description'
                            className='form-control'
                            onChange={(e)=> setDescription(e.target.value)}
                          />
                       </div>
                       <div className='mb-3'>
                          <input 
                            type='number'
                            value={price}
                            placeholder='write a Price'
                            className='form-control'
                            onChange={(e)=> setPrice(e.target.value)}
                          />
                       </div>
                       <div className='mb-3'>
                          <input 
                            type='number'
                            value={quantify}
                            placeholder='write a Quantify'
                            className='form-control'
                            onChange={(e)=> setQuatify(e.target.value)}
                          />
                       </div>
                       <div className='mb-3'>
                          <Select
                            bordered={false}                        
                            placeholder='Select Shipping'
                            size='large'
                            className='form-select mb-3'
                            onChange={(value)=> setShipping(value)}
                          >
                            <Option value='0'>No</Option>
                            <Option value='1'>Yes</Option>
                          </Select>
                       </div>
                       <div className='mb-3'>
                          <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProducto