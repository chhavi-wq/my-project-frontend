import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartslice";

export default function ApiDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  const stars = Math.round(product.rating || 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pt-28">
      <Link
        to="/shop"
        className="inline-block mb-6 px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
      >
        ← Back to Shop
      </Link>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-2xl"
          />
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">{product.category}</p>
          <h1 className="text-3xl font-light mb-2">{product.title}</h1>
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < stars ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
            <span className="text-gray-500 text-sm ml-2">
              ({product.rating})
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-medium mb-2">
            ₹{(product.price * 83).toLocaleString("en-IN")}
          </p>
          <p className="text-sm mb-1">
            {product.stock > 10 ? "In Stock" : "Low Stock"} ({product.stock} units)
          </p>
          <p className="text-sm mb-1">
            Shipping: {product.shippingInformation || "Available"}
          </p>
          <p className="text-sm mb-4">
            Minimum Order Quantity: {product.minimumOrderQuantity}
          </p>
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => {
                    if (!localStorage.getItem("token")) { navigate("/login"); return; }
                    dispatch(addToCart(product));
                  }}
              className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
            <button className="rounded-full border border-gray-300 px-6 py-2 hover:bg-gray-100 transition">
              View
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-light mb-4 mt-10">Customer Reviews</h2>
      <div className="flex flex-row gap-4 overflow-x-auto">
        {(product.reviews || []).slice(0, 3).map((r, i) => (
          <div key={i} className="border rounded-xl p-4 min-w-[280px] flex-1">
            <p className="font-medium">{r.reviewerName}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <span
                  key={j}
                  className={j < Math.round(r.rating) ? "text-yellow-400" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
            <p className="text-gray-400 text-xs mt-1">{r.reviewerEmail}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={() => navigate(`/shop/${Number(id) - 1}`)}
          className="rounded-full border border-gray-300 px-6 py-2 hover:bg-gray-100 transition"
        >
          Previous
        </button>
        <button
          onClick={() => navigate(`/shop/${Number(id) + 1}`)}
          className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
