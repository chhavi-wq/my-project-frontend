import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
export default function Home() {
  const scrollRef = useRef(null)
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" }) }
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const EXCHANGE_RATE = 83
  const formatINR = (usd) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(usd * EXCHANGE_RATE)
  useEffect(() => {
    let cancelled = false
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => { if (!res.ok) throw new Error("Failed to fetch products"); return res.json() })
      .then((data) => { if (!cancelled) { setProducts(data.products || []); setLoading(false) } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false) } })
    return () => { cancelled = true }
  }, [])
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="h-screen flex">
        <div className="w-1/2 flex flex-col justify-center px-12 bg-gray-50">
          <h1 className="text-6xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-2xl text-gray-700 mb-2">Big Sale — Up to 50% Off</p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl">Discover amazing products at great prices. New arrivals every week. Free shipping on orders over 💸 ₹5000.</p>
          <Link to="/shop"><button className="bg-black text-white px-10 py-4 text-lg rounded-none hover:bg-gray-800 w-fit">Shop Now</button></Link>
        </div>
        <div className="w-1/2 h-full">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80" alt="hero" className="w-full h-full object-cover" />
        </div>
      </section>
      <section className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-5xl font-bold mb-2">Why Choose Sage</h2>
        <p className="text-xl text-gray-500 mb-12">Thoughtfully crafted for everyday life</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl px-6">
          {[
            {t:"Timely Delivery", i:"🚚", d:"Fast and reliable shipping to your door."},
            {t:"Secure Payments", i:"🔒", d:"Safe checkout with trusted gateways."},
            {t:"Premium Quality", i:"⭐", d:"Top-grade products built to last."},
            {t:"24/7 Support", i:"📞", d:"Help whenever you need it."},
            {t:"Easy Returns", i:"↩️", d:"Hassle-free returns within 30 days."},
            {t:"Best Prices", i:"💰", d:"Competitive pricing every day."},
            {t:"Wide Selection", i:"🛍️", d:"Thousands of products to choose from."},
            {t:"Trusted Brand", i:"🏆", d:"Loved by customers worldwide."},
          ].map((b) => (
            <div key={b.t} className="bg-white shadow-md rounded-xl p-8 text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3 border border-gray-300 rounded-full w-14 h-14 flex items-center justify-center mx-auto">{b.i}</div>
              <h3 className="font-semibold text-lg mb-2">{b.t}</h3>
              <p className="text-sm text-gray-500">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-2">Shop by Category</h2>
          <p className="text-center text-gray-500 mb-10">Find what you love, curated for you</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80" },
              { name: "Fragrances", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80" },
              { name: "Groceries", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" },
              { name: "Furniture", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" },
            ].map((c) => (
              <div key={c.name} className="group bg-gray-50 rounded-xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
                <img src={c.img} alt={c.name} className="w-full h-64 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-3">{c.name}</h3>
                  <Link to="/shop"><button className="bg-black text-white px-6 py-2 rounded-full border border-black hover:bg-gray-800">Explore</button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="h-screen flex">
        <div className="w-1/2 flex flex-col justify-center px-12 bg-gray-50">
          <p className="text-lg text-gray-500 mb-4">Enlighten Your Home</p>
          <h2 className="text-5xl font-bold mb-4">Lighting shapes the atmosphere before a single word is spoken.</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">Bring warmth and sophistication into every room with timeless lighting pieces that blend modern elegance with everyday comfort.</p>
          <Link to="/shop"><button className="bg-black text-white px-8 py-4 text-lg rounded-full border border-black hover:bg-gray-800 w-fit">Explore Collection</button></Link>
        </div>
        <div className="w-1/2 h-full">
          <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80" alt="lighting" className="w-full h-full object-cover" />
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="w-full px-0">
          <h2 className="text-4xl font-bold text-center mb-10">Best Sellers</h2>
          <div className="relative w-full">
            <button onClick={() => scroll(-1)} className="absolute top-1/2 -translate-y-1/2 left-0 z-10 px-4 py-2 bg-gray-200 rounded-full text-2xl">←</button>
            <button onClick={() => scroll(1)} className="absolute top-1/2 -translate-y-1/2 right-0 z-10 px-4 py-2 bg-gray-200 rounded-full text-2xl">→</button>
             <div ref={scrollRef} className="overflow-x-auto w-full pt-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
               {loading && <p className="text-center text-gray-500 py-10">Loading...</p>}
               {error && <p className="text-center text-red-500 py-10">{error}</p>}
               {!loading && !error && (
                 <div className="flex gap-6">
                   {products.map((product) => (
                     <Link to={`/product/${product.id}`} key={product.id} className="min-w-[280px] bg-gray-50 rounded-xl p-6 text-center shadow hover:shadow-xl transition cursor-pointer block">
                       <img src={product.thumbnail} alt={product.title} className="h-64 w-full object-cover mb-3 rounded-lg hover:scale-105 transition-transform duration-300" />
                       <p className="font-semibold">{product.title}</p>
                       <p className="text-gray-600">{formatINR(product.price)}</p>
                       <p className="text-sm text-gray-500">Rating: {product.rating}</p>
                       <p className="text-sm text-gray-500">{product.category}</p>
                     </Link>
                   ))}
                 </div>
               )}
             </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <h3 className="text-2xl text-blue-600 mb-4">Need Assistance?</h3>
          <p className="text-gray-600 mb-2">Have questions about your order, products, or delivery? Our team is always ready to help you with quick and friendly support.</p>
          <p className="text-gray-600 mb-6">We're Here to Help</p>
          <Link to="/contact"><button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700">Contact</button></Link>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">SAGE</h3>
            <p className="text-gray-400 mb-4">Discover premium beauty, stylish furniture, everyday groceries, fragrances, and more—all in one place.</p>
            <div className="flex gap-3">
              {["T","F","I","P"].map((s) => (
                <span key={s} className="w-10 h-10 rounded-full border border-white flex items-center justify-center">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Beauty</li><li>Furniture</li><li>Groceries</li><li>Fragrances</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li><li>Our Story</li><li>Careers</li><li>Blog</li><li>FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Contact Us</li><li>Shipping</li><li>Returns</li><li>Privacy Policy</li><li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <div className="flex gap-4"><span>Privacy</span><span>Terms</span><span>Cookies</span></div>
          <p>© 2026 SAGE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
