import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Checkbox, Radio} from 'antd'
import { Price } from '../components/Prices';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [checked, setCheked] = useState([]);
  const [radio, setRadio] = useState([]);

  //get Products
  const getAllProducts = async () => {
    try {
       const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
       setProducts(data.product);
    } catch (error) {
       console.log(error);
    }
  }

  useEffect(()=>{
    getAllProducts();
  },[]);

  //get all cat
  const getAllCategory = async () => {
    try {
       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`);
       if(data.success){
          setCategories(data.category);
       }
      } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = (value, id) => {
     let all = [...checked];
     if(value){
       all.push(id)
     }else{
      all = all.filter(c => c !== id)
     }
     setCheked(all)
  }

  useEffect(()=>{
    getAllCategory();
    
  },[]);

  return (
    <Layout title={'All Products - Best offers'}>
        <div className='row mt-3'>
          <div className='col-md-2'>
            <h4 className='text-center'>Filter By Category</h4>
            <div className='d-flex flex-column'>
              {
                categories?.map(c => (
                  <Checkbox 
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  > {c.name} </Checkbox>
                ))
              }
            </div>
            <h4 className='text-center mt-4'>Filter By Price</h4>
            <div className='d-flex flex-column'>
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {
                  Price?.map(p => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))
                }
              </Radio.Group>
            </div>
          </div>
          <div className='col-md-9'>
            {JSON.stringify(radio, null, 4)}
             <h1 className='text-center'>All Products</h1>
             <div className='d-flex flex-wrap'>
                {products?.map(p=>( 
                    <>
                        <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}/>
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                                <button  className="btn btn-primary ms-1">See Details</button>
                                <button  className="btn btn-secondary ms-1">ADD TO CART</button>
                            </div>
                        </div>                                           
                    </>            
                ))}
             </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage;