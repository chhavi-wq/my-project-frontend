import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
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

  const getUsers = async () => {
    try {
      const response = await apiFetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) setUsers(data.data || data);
      else {}
    } catch {
      
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await apiFetch(`${import.meta.env.VITE_API_URL}/users/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (response.ok) {  getUsers(); }
      else {}
    } catch {  }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await apiFetch(`${import.meta.env.VITE_API_URL}/orders/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (response.ok) {  getOrders(); }
      else {}
    } catch {  }
  };

  const searchUser = async (value) => {
    setSearch(value);
    if (value === "") { getUsers(); return; }
    try {
      const response = await apiFetch(`${import.meta.env.VITE_API_URL}/users/search?query=${value}`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) setUsers(data.data || data);
      else {}
    } catch {  }
  };

  const getOrders = async () => {
    try {
      const response = await apiFetch(`${import.meta.env.VITE_API_URL}/orders`);
      const data = await response.json();
      if (response.ok) setOrders(data.data || data);
      else {}
    } catch {  }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await apiFetch(`${import.meta.env.VITE_API_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (response.ok) {  getOrders(); }
      else {}
    } catch {  }
  };

  useEffect(() => {
    getUsers();
    getOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${darkMode ? "bg-[#141916]" : "bg-white"} p-8`}>
        <h1 className={`text-4xl font-bold ${darkMode ? "text-[#F0EEE7]" : "text-[#3E2723]"} text-center mt-20 mb-10`}>
          Admin Dashboard
        </h1>
        <div className="space-y-6">
          {users.map((user) => {
            const userOrders = orders.filter((order) => String(order.user?._id || order.user) === String(user._id));
            return (
              <div key={user._id} className={`${darkMode ? "bg-[#181D1A] border-[#2A332D]" : "bg-white border-[#E2DFD6]"}   overflow-hidden border`}>
                <div className={`${darkMode ? "bg-[#000000]" : "bg-[#000000]"} text-white px-6 py-4 flex justify-between items-center`}>
                  <div>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-sm opacity-80">{user.email}</p>
                  </div>
                  <span className={`${darkMode ? "bg-[#F0EEE7] text-[#000000]" : "bg-white text-[#000000]"} px-4 py-1 rounded-full font-medium`}>{user.role}</span>
                </div>
                <div className="flex flex-col gap-6 p-6">
                  <div className={`${darkMode ? "bg-[#202621] border border-[#2A332D]" : "bg-white"} rounded-xl p-5`}>
                    <h3 className={`text-xl font-bold ${darkMode ? "text-[#F0EEE7]" : "text-[#3E2723]"} mb-4`}>User Details</h3>
                    <p className={darkMode ? "text-[#A9ADA7]" : "text-gray-600"}>Name: <span className={`font-semibold ${darkMode ? "text-[#F0EEE7]" : "text-[#3E2723]"}`}>{user.name}</span></p>
                    <p className={darkMode ? "text-[#A9ADA7]" : "text-gray-600"}>Email: <span className={`font-semibold ${darkMode ? "text-[#F0EEE7]" : "text-[#3E2723]"}`}>{user.email}</span></p>
                    <button onClick={() => deleteUser(user._id)} className="mt-5 bg-red-400 text-white px-5 py-2  hover:bg-red-500">Delete User</button>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-[#F0EEE7]" : "text-[#3E2723]"} mb-4`}>Orders</h3>
                    {userOrders.length === 0 ? (
                      <p className={darkMode ? "text-[#A9ADA7]" : "text-gray-500"}>No orders yet</p>
                    ) : (
                      userOrders.map((order) => (
                        <div key={order._id} className={`border rounded-xl p-4 mb-4 ${darkMode ? "bg-[#181D1A] border-[#2A332D]" : "bg-white border-[#E5DDD3]"}`}>
                          <div className="flex justify-between mb-3">
                            <p className={`font-semibold ${darkMode ? "text-[#F0EEE7]" : "text-[#2F2A26]"}`}>Order ID: {order._id.slice(-6)}</p>
                            <p className="font-bold text-[#000000]">₹{Math.floor(order.totalAmount)}</p>
                          </div>
                          <div className={`mb-3 ${darkMode ? "text-[#A9ADA7]" : "text-gray-600"}`}>
                            {order.products.map((item, i) => (
                              <p key={i}>{item.title} × {item.quantity}</p>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className={`border  px-6 py-2 outline-none ${darkMode ? "bg-[#202621] border-[#2A332D] text-[#F0EEE7]" : "bg-white border-[#DDD5CB] text-[#2F2A26]"}`}>
                              <option>Pending</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                            <button onClick={() => deleteOrder(order._id)} className="bg-red-400 text-white px-4 py-2  hover:bg-red-500">Delete Order</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Admin;
