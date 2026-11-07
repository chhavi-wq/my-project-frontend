import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartslice";

const FILTERS = ["all", "beauty", "fragrances", "furniture", "groceries"];
const BRANDS = ["Chanel", "Dior", "Calvin Klein", "Gucci"];

export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
  };
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [stars, setStars] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [stockFilter, setStockFilter] = useState(null);
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "https://dummyjson.com/products?limit=30";
      if (active !== "all") url = `https://dummyjson.com/products/category/${active}?limit=30`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
    };
    fetchProducts();
  }, [active]);

  const handleFilter = (cat) => {
    setActive(cat);
    setQuery("");
  };

  const filtered = useMemo(() => {
    let list = products;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (stars) list = list.filter((p) => Math.round(p.rating) >= stars);
    if (priceRange) {
      const [min, max] = priceRange;
      list = list.filter((p) => p.price * 83 >= min && p.price * 83 <= max);
    }
    if (stockFilter === "low") list = list.filter((p) => p.stock <= 10);
    if (stockFilter === "high") list = list.filter((p) => p.stock > 10);
    if (brand) list = list.filter((p) => (p.brand || "").toLowerCase().includes(brand.toLowerCase()));
    return list;
  }, [products, query, stars, priceRange, stockFilter, brand]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80"
          alt="Shopping"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            New Season Discover Timeless Beauty
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Elevate your everyday routine with thoughtfully curated products designed for effortless elegance and lasting quality.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="rounded-full bg-white text-black px-8 py-3 hover:bg-gray-100 transition">
              Shop Collections
            </button>
            <button className="rounded-full border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition">
              Explore More
            </button>
          </div>
        </div>
      </div>

      <section className="py-20 px-6 max-w-7xl mx-auto flex gap-8">
        <aside className="w-64 shrink-0 space-y-6 sticky top-20 self-start h-fit">
          <div>
            <h3 className="font-medium mb-2">Category</h3>
            <div className="flex flex-col gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilter(f)}
                  className={`text-left px-3 py-1 rounded ${active === f ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Stars</h3>
            {[4, 3, 2].map((s) => (
              <button
                key={s}
                onClick={() => setStars(stars === s ? null : s)}
                className={`block w-full text-left px-3 py-1 rounded ${stars === s ? "bg-black text-white" : "hover:bg-gray-100"}`}
              >
                {s}+ stars
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Price</h3>
            {[
              [100, 2000],
              [2000, 20000],
              [20000, 80000],
            ].map(([min, max]) => (
              <button
                key={min}
                onClick={() =>
                  setPriceRange(priceRange && priceRange[0] === min ? null : [min, max])
                }
                className={`block w-full text-left px-3 py-1 rounded ${
                  priceRange && priceRange[0] === min ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                ₹{min.toLocaleString("en-IN")} - ₹{max.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Stock</h3>
            {["low", "high"].map((s) => (
              <button
                key={s}
                onClick={() => setStockFilter(stockFilter === s ? null : s)}
                className={`block w-full text-left px-3 py-1 rounded ${stockFilter === s ? "bg-black text-white" : "hover:bg-gray-100"}`}
              >
                {s === "low" ? "Low Stock" : "High Stock"}
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Top Brands</h3>
            {BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(brand === b ? null : b)}
                className={`block w-full text-left px-3 py-1 rounded ${brand === b ? "bg-black text-white" : "hover:bg-gray-100"}`}
              >
                {b}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="border border-gray-300 rounded-full px-5 py-2 focus:outline-none flex-1"
            />
            <button
              type="submit"
              className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
            >
              Search
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="border rounded-2xl p-4 shadow-sm">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="font-medium mb-1">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <p className="text-gray-500 text-xs mb-1">{product.category}</p>
                <p className="text-gray-600 text-sm mb-1">
                  ₹{Math.floor(product.price * 83).toLocaleString("en-IN")}
                </p>
                <p className="text-gray-600 text-xs mb-1">
                  {product.stock > 10 ? "In Stock" : "Low Stock"}
                </p>
                <p className="text-gray-600 text-xs mb-2">
                  Discount: {product.discountPercentage}%
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 rounded-full py-2 transition text-white ${
                      product.stock > 10
                        ? "bg-black hover:bg-gray-800"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/shop/${product.id}`}
                    className="flex-1 text-center rounded-full py-2 transition border border-gray-300 hover:bg-gray-100"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
