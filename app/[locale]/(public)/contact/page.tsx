"use client";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Get in touch.</h1>
            <p className="text-gray-500 text-lg">
              Have a question about an order or just want to say hi? We'd love
              to hear from you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center"></div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Email us
                </p>
                <p className="font-medium text-lg">hello@yourbrand.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center"></div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Visit us
                </p>
                <p className="font-medium text-lg">
                  123 Design St, Cairo, Egypt
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={5}
                className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
