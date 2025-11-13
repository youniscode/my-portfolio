export default function CoffeeHouse() {
  const menuItems = [
    { name: "Espresso", desc: "Rich & bold shot", price: "€2.50" },
    { name: "Americano", desc: "Espresso + hot water", price: "€3.00" },
    { name: "Cappuccino", desc: "Foam + steamed milk", price: "€3.80" },
    { name: "Latte", desc: "Silky steamed milk", price: "€4.20" },
    { name: "Mocha", desc: "Chocolate + espresso", price: "€4.50" },
    { name: "Flat White", desc: "Velvety microfoam", price: "€4.00" },
    { name: "Cold Brew", desc: "Slow steeped, smooth", price: "€4.50" },
    { name: "Tea Selection", desc: "Green, black, herbal", price: "€3.20" },
  ];

  return (
    <div className="coffee-house-page min-h-screen bg-[#1c1b19] text-[#f5f3ef]">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto py-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Minimal Café</h1>
        <nav className="flex gap-6 text-sm">
          <a href="#menu" className="hover:text-[#cda274]">
            Menu
          </a>
          <a href="#about" className="hover:text-[#cda274]">
            About
          </a>
          <a href="#booking" className="hover:text-[#cda274]">
            Book Table
          </a>
        </nav>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">Fresh Coffee. Modern Taste.</h2>
        <p className="text-lg text-[#d4cfc7] mb-8">
          Enjoy a perfect cup every day in a cozy, minimalist setting.
        </p>
        <a
          href="#booking"
          className="bg-[#cda274] text-[#1c1b19] px-6 py-3 rounded-xl font-medium hover:bg-[#e3b98b] transition"
        >
          Book a Table
        </a>
      </main>

      {/* MENU */}
      <section id="menu" className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold mb-6">Menu</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-[#24221f]/70 border border-[#2d2b28] rounded-xl p-4 flex justify-between items-start"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-[#d4cfc7] mt-1">{item.desc}</div>
              </div>
              <div className="text-[#cda274] font-semibold ml-4">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* BOOKING */}
      <section id="booking" className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold mb-6">Book a Table</h3>
        <p className="text-[#d4cfc7] mb-6">
          Reserve your spot tell us when you’re visiting and how many guests.
        </p>

        <form
          action="https://formspree.io/f/xblpnjae" // reuse your Formspree endpoint
          method="POST"
          className="bg-[#24221f]/70 border border-[#2d2b28] rounded-xl p-6 space-y-4"
        >
          {/* Helps you identify bookings in the Formspree inbox */}
          <input
            type="hidden"
            name="_subject"
            value="New Coffee House Booking"
          />
          <input type="hidden" name="project" value="coffee-house" />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg bg-[#1f1e1b] border border-[#2d2b28] px-4 py-3 text-[#f5f3ef] placeholder-[#a8a6a1] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
            <input
              className="w-full rounded-lg bg-[#1f1e1b] border border-[#2d2b28] px-4 py-3 text-[#f5f3ef] placeholder-[#a8a6a1] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg bg-[#1f1e1b] border border-[#2d2b28] px-4 py-3 text-[#f5f3ef] placeholder-[#a8a6a1] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
              type="date"
              name="date"
              required
            />
            <input
              className="w-full rounded-lg bg-[#1f1e1b] border border-[#2d2b28] px-4 py-3 text-[#f5f3ef] placeholder-[#a8a6a1] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
              type="time"
              name="time"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg bg-[#1f1e1b] border border-[#2d2b28] px-4 py-3 text-[#f5f3ef] placeholder-[#a8a6a1] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
              type="number"
              name="guests"
              min="1"
              max="12"
              placeholder="Guests"
              required
            />
            <input
              className="w-full rounded-lg bg-[#1f1e1b] border border-[#2d2b28] px-4 py-3 text-[#f5f3ef] placeholder-[#a8a6a1] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
            />
          </div>

          <textarea
            className="w-full rounded-lg bg-[#1f1e1b] border border-[#2d2b28] px-4 py-3 text-[#f5f3ef] placeholder-[#a8a6a1] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
            name="notes"
            rows="4"
            placeholder="Notes or special requests…"
          />

          <button
            type="submit"
            className="w-full md:w-auto bg-[#cda274] text-[#1c1b19] px-6 py-3 rounded-xl font-medium hover:bg-[#e3b98b] transition"
          >
            Confirm Reservation
          </button>

          {/* Optional honeypot for spam */}
          <input
            type="text"
            name="_gotcha"
            className="hidden"
            aria-hidden="true"
          />
          {/* Optional redirect after success */}
          {/* <input type="hidden" name="_redirect" value="https://www.jonascode.com/thanks" /> */}
        </form>
      </section>

      {/* FOOTER LINK */}
      <footer className="text-center py-6 text-sm text-[#a8a6a1]">
        <a href="/" className="hover:text-[#cda274]">
          ← Back to jonascode.dev
        </a>
      </footer>
    </div>
  );
}
