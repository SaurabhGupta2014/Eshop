
import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProductInfo from './pages/ProductInfo'
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';

import './stylesheets/layout.css';
import './stylesheets/products.css';
import './stylesheets/authentication.css';
import {Route , BrowserRouter , Routes, Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>

          {/* unprotected routes */}
          <Route path='/login' exact element={<LoginPage/>} />
          <Route path='/register' exact element={<RegisterPage/>} />


            {/* protected routes if user is not logged in then we cant show these pages */}
          <Route path='/' exact element={<ProtectedRoutes><Homepage/></ProtectedRoutes>} />
          <Route path='/productinfo/:productid' exact element={<ProtectedRoutes><ProductInfo/></ProtectedRoutes>} />
          <Route path='/cart' exact element={<ProtectedRoutes><CartPage/></ProtectedRoutes>} />
          <Route path='/orders' exact element={<ProtectedRoutes><OrdersPage/></ProtectedRoutes>} />
          <Route path='/admin' exact element={<ProtectedRoutes><AdminPage/></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


export const ProtectedRoutes= ({children})=>{

  if(localStorage.getItem('currentUser')){
     return children;
  }
  else{
   return <Navigate to='/login' />
  }

}
