
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#173f31] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">

        {/* Logo and Copyright */}
        <div className="text-center md:text-left">
          <Link href="/" className="text-2xl font-bold">
            📚 BookNook
          </Link>

          <p className="mt-2 text-xs text-gray-300">
            © 2026 BookNook. All rights reserved.
          </p>
        </div>

        {/* Description */}
        <p className="max-w-xs text-center text-sm text-gray-300">
          Discover, borrow, and enjoy your favorite books with BookNook.
        </p>

        {/* Contact */}
        <div className="text-center text-sm text-gray-300">
          <h3 className="mb-2 font-semibold text-white">Contact Us</h3>
          <p>hello@booknook.com</p>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="mb-2 font-semibold">Follow Us</h3>

          <div className="flex gap-4 text-sm text-gray-300">
            <a href="https://facebook.com" className="hover:text-white">
              Facebook
            </a>
            <a href="https://instagram.com" className="hover:text-white">
              Instagram
            </a>
            <a href="https://linkedin.com" className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
