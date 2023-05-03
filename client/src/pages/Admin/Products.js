import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState([]);
    
    const getAllProducts = async () => {
       try {
          const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
          console.log(data);
          setProducts(data.product);
       } catch (error) {
          console.log(error);
          toast.error('someething Went Wrong');
       }
    }

    useEffect(()=>{
        getAllProducts();
    },[]);

  return (
    <Layout title={'All Products'}>
        <div className='row'>
            <div className='col-md-3'>
               <AdminMenu />
            </div>
            <div className='col-md-9' > 
               <h1 className='text-center'>All Products List</h1>
               <div className='d-flex'>
                {products?.map(p=>( 
                    <>
                        <Link to={`/dashboard/admin/product/${p.slug}`}
                           className='product-link'
                        >
                            <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}/>
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                </div>
                            </div>    
                        </Link>               
                        
                    </>            
                ))}
               </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products