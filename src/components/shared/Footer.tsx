

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © 2025 <span className="font-semibold text-white">Easy Library</span>. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 mt-3 text-gray-400 text-sm">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white transition">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
