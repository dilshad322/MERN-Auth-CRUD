
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Home from './components/Home';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
function App() {


  return (
    <>
<Routes>
 <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
         <Route
    path="/create-product"
    element={
      <ProtectedRoute>
        <CreateProduct />
      </ProtectedRoute>
    }
  />
           <Route
    path="/update-product/:id"
    element={
      <ProtectedRoute>
        <UpdateProduct />
      </ProtectedRoute>
    }
  />
  <Route path='/login' element={<PublicRoute><Login /></PublicRoute> }/>
    <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute> }/>
    <Route path="/reset-password/:token" element={<ResetPassword />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="*" element={<NotFound />} />
</Routes>
            <ToastContainer />
    </>
  )
}

export default App
