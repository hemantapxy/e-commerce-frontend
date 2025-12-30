import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      {/* Top Section: Links */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold mb-3 text-lg">About</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">About E-Shop</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-lg">Help</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Payments</a></li>
            <li><a href="#" className="hover:text-white">Shipping</a></li>
            <li><a href="#" className="hover:text-white">Cancellation & Returns</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-lg">Policy</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Return Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-lg">Social</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">Twitter</a></li>
            <li><a href="#" className="hover:text-white">Instagram</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © 2025 E-Shop. All rights reserved.
      </div>
    </footer>
  );
}
