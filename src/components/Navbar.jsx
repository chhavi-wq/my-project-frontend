import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../slice/cartslice";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const cartitem = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cartitem.length;

  const handleLogout = () => {
    dispatch(clearCart());
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 mx-3 sm:mx-6 rounded-none border border-gray-400 bg-white backdrop-blur-lg shadow-lg z-50 text-black font-serif">
        <ul>
          <div className="items-center hidden lg:!px-10 lg:flex justify-between px-4 py-3 sm:px-8 sm:py-4 text-black">
            <div className="flex gap-6 font-medium">
              <Link to="/"><li className="hover:scale-110 duration-200 transition">Home</li></Link>
              <Link to="/shop"><li className="hover:scale-110 duration-200 transition">Shop</li></Link>
              <Link to="/cart"><li className="hover:scale-110 duration-200 transition">Cart ({count})</li></Link>
              <Link to="/orders"><li className="hover:scale-110 duration-200 transition">My Orders</li></Link>
              <Link to="/contact"><li className="hover:scale-110 duration-200 transition">Contact</li></Link>
            </div>
            <div className="flex text-center items-center gap-5">

              <Link to="/admin"><li className="cursor-pointer hover:scale-110 duration-200 transition font-medium list-none">Admin</li></Link>
              {token ? (
                <li onClick={handleLogout} className="cursor-pointer hover:scale-110 duration-200 transition font-medium list-none">Logout</li>
              ) : (
                <Link to="/login"><li className="hover:scale-110 duration-200 transition font-medium">Login</li></Link>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden px-6 py-2 text-2xl">
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>
        </ul>
        {menuOpen && (
          <div className="lg:hidden px-6 pb-5">
            <div className="flex flex-col gap-4 font-medium border-t border-white/20 pt-4">
              <Link className="hover:bg-[#6B7D72] hover:text-white transition-duration-200 rounded-full px-3 py-2" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link className="hover:bg-[#6B7D72] hover:text-white transition-duration-200 rounded-full px-3 py-2" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link className="hover:bg-[#6B7D72] hover:text-white transition-duration-200 rounded-full px-3 py-2" to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link className="hover:bg-[#6B7D72] hover:text-white transition-duration-200 rounded-full px-3 py-2" to="/cart" onClick={() => setMenuOpen(false)}>Cart ({count})</Link>
              <Link className="hover:bg-[#6B7D72] hover:text-white transition-duration-200 rounded-full px-3 py-2" to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
              <Link className="hover:bg-[#6B7D72] hover:text-white transition-duration-200 rounded-full px-3 py-2" to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              {token ? (
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:bg-[#6B7D72] text-left hover:text-white transition-duration-200 rounded-full px-3 py-2">Logout</button>
              ) : (
                <Link className="hover:bg-[#6B7D72] hover:text-white transition-duration-200 rounded-full px-3 py-2" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;