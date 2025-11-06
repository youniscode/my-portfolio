export default function CoffeeHouse() {
  return (
    <div className="coffee-house-page min-h-screen bg-[#1c1b19] text-[#f5f3ef]">
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
      <section id="booking" className="max-w-3xl mx-auto px-4 pb-24">
        <h3 className="text-3xl font-semibold mb-4">Book a Table</h3>
        <p className="text-[#d4cfc7] mb-6">
          Reserve your spot—tell us when you’re visiting and how many guests.
        </p>

        <form
          action="https://formspree.io/f/xblpnjae"
          method="POST"
          className="grid gap-4 sm:grid-cols-2 bg-[#201f1c] border border-[#2a2926] rounded-2xl p-6"
        >
          {/* optional helper to identify this form in your inbox */}
          <input type="hidden" name="form_name" value="coffee_house_booking" />

          <div className="sm:col-span-2">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-lg bg-[#1c1b19] border border-[#2a2926] px-4 py-3 text-[#f5f3ef] placeholder-[#9f988d] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="w-full rounded-lg bg-[#1c1b19] border border-[#2a2926] px-4 py-3 text-[#f5f3ef] placeholder-[#9f988d] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
            />
          </div>

          <div>
            <label htmlFor="date" className="sr-only">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className="w-full rounded-lg bg-[#1c1b19] border border-[#2a2926] px-4 py-3 text-[#f5f3ef] placeholder-[#9f988d] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
            />
          </div>

          <div>
            <label htmlFor="time" className="sr-only">
              Time
            </label>
            <input
              id="time"
              name="time"
              type="time"
              required
              className="w-full rounded-lg bg-[#1c1b19] border border-[#2a2926] px-4 py-3 text-[#f5f3ef] placeholder-[#9f988d] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
            />
          </div>

          <div>
            <label htmlFor="guests" className="sr-only">
              Guests
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="12"
              placeholder="Guests"
              required
              className="w-full rounded-lg bg-[#1c1b19] border border-[#2a2926] px-4 py-3 text-[#f5f3ef] placeholder-[#9f988d] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className="sr-only">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Notes or special requests…"
              className="w-full rounded-lg bg-[#1c1b19] border border-[#2a2926] px-4 py-3 text-[#f5f3ef] placeholder-[#9f988d] focus:outline-none focus:ring-2 focus:ring-[#cda274]"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#cda274] text-[#1c1b19] px-6 py-3 rounded-xl font-medium hover:bg-[#e3b98b] transition"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </section>
      <footer className="border-t border-[#2a2926] py-8 text-center text-[#9f988d]">
        <a href="/" className="hover:text-[#cda274]">
          ← Back to jonascode.dev
        </a>
      </footer>
    </div>
  );
}
