import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const darkMode = false;

  const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
      return;
    }
    return response;
  };

  const fetchOrders = async () => {
    const response = await apiFetch(`${import.meta.env.VITE_API_URL}/orders/user/${localStorage.getItem("userId")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response) return;
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
      return;
    }
    const data = await response.json();
    setOrders(data.data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className={`relative min-h-screen overflow-hidden pt-40 px-6 transition-colors duration-500 ${darkMode ? "bg-[#111512] text-[#F5F1E8]" : "bg-[#F6F2EC]"}`}>
        <div className="relative z-10 mx-auto max-w-5xl">
          <h1 className={`text-5xl font-mono font-bold md:text-6xl ${darkMode ? "text-[#F5F1E8]" : "text-[#2F2A26]"}`}>My Orders</h1>
          <div className="mt-10 space-y-10">
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders found.</p>
            ) : (
              orders.map((order, index) => (
                <div key={order._id} className="border rounded-3xl p-6">
                  <p className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                  <p className="text-sm text-gray-600">Total: ₹{Math.floor(order.totalAmount)}</p>
                  <div className="mt-4 space-y-2">
                    {order.products?.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="pt-4">{item.title} x {item.quantity}</span>
                        <span className="pt-4">₹{Math.floor(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
