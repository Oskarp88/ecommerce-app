
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/routes/AdminRoute';
import CreateCategorias from './pages/Admin/CreateCategorias';
import CreateProducto from './pages/Admin/CreateProducto';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';




function App() {
  return (
    <>
       <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/dashboard' element={<PrivateRoute/>}>
             <Route path='user' element={<Dashboard/>}/>
             <Route path='user/profile' element={<Profile/>}/>
             <Route path='user/orders' element={<Orders/>}/>
         </Route>
         <Route path='/dashboard' element={<AdminRoute/>}>
             <Route path='admin' element={<AdminDashboard/>}/>
             <Route path='admin/create-category' element={<CreateCategorias/>}/>
             <Route path='admin/create-product' element={<CreateProducto/>}/>
             <Route path='admin/users' element={<Users/>}/>
         </Route>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/forgot-password' element={<ForgotPassword/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/policy' element={<Policy/>}/>
         <Route path='/*' element={<PageNotFound/>}/>
       </Routes>
    </>
  );
}

export default App;
