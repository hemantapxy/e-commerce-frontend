import React from "react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  ShieldCheck, 
  HelpCircle 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#172337] text-white mt-16 pt-12">
      {/* 1. MAIN LINKS SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-gray-700">
        
        {/* Brand & Address */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold mb-4 tracking-tight">E-SHOP</h3>
          <ul className="space-y-3 text-gray-400 text-xs">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-blue-500 shrink-0" />
              <span>Registered Office Address:<br/> 123 Tech Park, Whitefield, Bangalore, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-blue-500" />
              <span>+91 80 1234 5678</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-blue-500" />
              <span>support@eshop.com</span>
            </li>
          </ul>
        </div>

        {/* Links Columns */}
        <div>
          <h3 className="text-gray-500 font-bold mb-4 text-xs uppercase tracking-widest">About</h3>
          <ul className="space-y-2 text-gray-300 text-xs font-semibold">
            <li><a href="/Contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/About" className="hover:underline">About Us</a></li>
            <li><a href="/Careers" className="hover:underline">Careers</a></li>
            <li><a href="/CorporateInfo" className="hover:underline">Corporate Information</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-500 font-bold mb-4 text-xs uppercase tracking-widest">Help</h3>
          <ul className="space-y-2 text-gray-300 text-xs font-semibold">
            <li><a href="/Payments" className="hover:underline">Payments</a></li>
            <li><a href="/Shipping" className="hover:underline">Shipping</a></li>
            <li><a href="/Cancellation" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="/FAQ" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-500 font-bold mb-4 text-xs uppercase tracking-widest">Policy</h3>
          <ul className="space-y-2 text-gray-300 text-xs font-semibold">
            <li><a href="/Returns" className="hover:underline">Return Policy</a></li>
            <li><a href="/Terms" className="hover:underline">Terms of Use</a></li>
            <li><a href="/Security" className="hover:underline">Security</a></li>
            <li><a href="/Privacy" className="hover:underline">Privacy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-500 font-bold mb-4 text-xs uppercase tracking-widest">Social</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/1WySNsH1Pk/" className="text-gray-300 hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
            <a href="https://x.com/hemantapxy" className="text-gray-300 hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
            <a href="https://www.instagram.com/nextgen_gudu?igsh=MWtkb2dzNzhqbXl6Zw==" className="text-gray-300 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            <a href="https://www.linkedin.com/in/hemanta-pradhan-801146296/" className="text-gray-300 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* 2. SUB-FOOTER: TRUST & PAYMENTS */}
      <div className="bg-[#172337] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 border-r-0 md:border-r border-gray-700 pr-0 md:pr-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <ShieldCheck className="text-yellow-500" size={18} />
              <span>100% SECURE</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <HelpCircle className="text-blue-400" size={18} />
              <span>24/7 SUPPORT</span>
            </div>
          </div>

          {/* Payment Icons */}
          <div className="flex flex-wrap justify-center gap-4 grayscale opacity-70 hover:grayscale-0 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-5" />
          </div>
        </div>
      </div>

      {/* 3. LEGAL COPYRIGHT SECTION */}
      <div className="border-t border-gray-800 bg-[#121926] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {currentYear} E-SHOP.com. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Become a Seller</a>
            <a href="#" className="hover:text-white transition">Advertise</a>
            <a href="#" className="hover:text-white transition">Gift Cards</a>
            <a href="#" className="hover:text-white transition">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}