export default function Footer() {
  return (
    <footer className="w-full px-[14%] py-10 mt-10 bg-blue-100 flex justify-center">
      <div className="w-full max-w-screen-xl text-center space-y-6">
        {/* Footer Title */}
        <h4 className="text-xl font-semibold text-purple-700">IBDA Kost</h4>

        {/* Links Section */}
        <div className="text-lg text-gray-700">
          <p className="mb-4">
            Temukan lebih banyak informasi tentang layanan kami:
          </p>
          <div className="space-x-6">
            <a
              href="/terms-and-conditions"
              className="text-purple-600 hover:underline"
            >
              Syarat & Ketentuan
            </a>
            <a
              href="/privacy-policy"
              className="text-purple-600 hover:underline"
            >
              Kebijakan Privasi
            </a>
            <a href="/contact-us" className="text-purple-600 hover:underline">
              Kontak Kami
            </a>
            <a href="/about-us" className="text-purple-600 hover:underline">
              Tentang Kami
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-lg text-gray-600">
          <p>
            Hubungi Kami: <strong>(021) 1234 5678</strong>
          </p>
          <p>
            Email: <strong>support@IBDAkost.com</strong>
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 mt-4">
          <p>
            &copy; {new Date().getFullYear()} IBDA Kost. Semua hak cipta
            dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
