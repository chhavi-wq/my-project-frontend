import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, removeFromCart, addToCart, clearCart } from "../slice/cartslice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const total = cart.reduce((sum, p) => sum + p.price * 83 * p.quantity, 0);

  const handlePayNow = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, currency: 'INR', receipt: 'rcpt_' + Date.now() }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Order creation failed');
      const options = {
        key: data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
amount: data.amount,
currency: 'INR',
name: 'MERN Shop',
description: 'Test payment',
order_id: data.orderId,
handler: (response) => {
           if (!localStorage.getItem("userId")) {
             alert("Please login first");
             navigate("/login");
             return;
           }
           fetch(`${import.meta.env.VITE_API_URL}/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          }).then(() => {
            fetch(`${import.meta.env.VITE_API_URL}/orders`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user: localStorage.getItem("userId"),
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                products: cart.map((p) => ({
                  title: p.title,
                  price: p.price * 83,
                  quantity: p.quantity,
                  thumbnail: p.thumbnail,
                })),
                totalAmount: total,
                status: 'pending',
              }),
            }).then(() => {
              dispatch(clearCart());
              navigate('/orders');
            });
          });
        },
        prefill: { name: 'Test User', email: 'test@example.com', contact: '9999999999' },
        theme: { color: '#000000' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((p, i) => (
            <div key={i} className="flex items-center gap-4 border rounded-xl p-4">
              <img src={p.thumbnail} alt={p.title} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-gray-600 text-sm">₹{(p.price * 83).toLocaleString("en-IN")} x {p.quantity}</p>
                <p className="text-gray-800 font-medium">Total: ₹{(p.price * 83 * p.quantity).toLocaleString("en-IN")}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(removeFromCart(p.id))}
                  className="w-8 h-8 rounded-full border hover:bg-gray-100"
                >
                  -
                </button>
                <span>{p.quantity}</span>
                <button
                  onClick={() => { if (!localStorage.getItem("token")) { navigate("/login"); return; } dispatch(addToCart(p)); }}
                  className="w-8 h-8 rounded-full border hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => dispatch(removeItem(p.id))}
                className="rounded-full bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="border rounded-xl p-6 h-fit sticky top-28">
        <h2 className="text-xl font-light mb-4">Order Summary</h2>
        <p className="flex justify-between mb-2">
          <span>Items</span>
          <span>{cart.reduce((s, p) => s + p.quantity, 0)}</span>
        </p>
        <p className="flex justify-between mb-4 font-medium">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </p>
        <button
          onClick={() => dispatch(clearCart())}
          className="w-full mb-3 rounded-full border border-gray-300 py-2 hover:bg-gray-100 transition"
        >
          Clear Cart
        </button>
        <button onClick={handlePayNow} className="w-full rounded-full bg-black text-white py-2 hover:bg-gray-800 transition">
          Pay Now
        </button>
      </div>
      )}
    </div>
  );
}
