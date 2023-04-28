import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout>
        <div className='row contactus'>
          <div className='col-md-6'> 
            <img
              src='image/laptop-2838917_1280.jpg'
              alt='contactus'
              style={{width: '100%'}}
            />
          </div>
          <div className='col-md-4'>
            <h1 className='bg-dark p-2 text-white text-center'>About</h1>
            <p className='text-justify mt-2'>
              eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default About