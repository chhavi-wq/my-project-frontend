import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Contact from './pages/contact'
import Shop from './pages/shop'
import ApiDetails from './pages/apidetails'
import Cart from './pages/cart'
import Orders from './pages/orders'
import Admin from './pages/admin'
import Login from './pages/login'
import Signup from './pages/signup'
import VerifyOtp from './pages/verifyOtp'
import Navbar from './components/Navbar'
import AdminRoute from './components/adminRoute'
import ProtectRouting from './components/protectRouting'

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/verify-otp";
  return (
    <>
      <Toaster position="top-right" />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectRouting><Home /></ProtectRouting>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ApiDetails />} />
        <Route path="/product/:id" element={<ApiDetails />} />
        <Route path="/cart" element={<ProtectRouting><Cart /></ProtectRouting>} />
<Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </>
  )
}

export default App
