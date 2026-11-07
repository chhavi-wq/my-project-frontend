export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-50">
      <div className="text-center mb-12 mt-24">
        <h1 className="text-4xl font-light mb-4">We'd Love to Hear From You</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Questions, collaborations or simply saying hello—our team is always happy to help.
        </p>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 text-gray-900 rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-light mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <p>New Delhi, India</p>
            <p>+91 98765 43210</p>
            <p>hello@sage.com</p>
            <p>Monday – Friday, 9 AM – 6 PM</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:border-gray-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:border-gray-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:border-gray-500"
            />
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-2xl px-6 py-4 resize-none focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-gray-800 text-white py-3 hover:bg-gray-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
