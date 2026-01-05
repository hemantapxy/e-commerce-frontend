import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import { Trash2, FileText, ChevronRight, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CartPage({ token }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, [token]);

  const fetchCart = () => {
    getCart(token)
      .then((res) => {
        const validItems = res.data.items.filter((item) => item.product !== null);
        setCart({ items: validItems });
      })
      .catch(() => toast.error("Failed to load cart"))
      .finally(() => setLoading(false));
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeFromCart(id, token);
      const validItems = res.data.items.filter((item) => item.product !== null);
      setCart({ items: validItems });
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const downloadInvoice = (item) => {
    if (!item.product) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("E-SHOP INVOICE", 14, 22);
    doc.setLineWidth(0.5);
    doc.line(14, 28, 196, 28);
    
    doc.setFontSize(12);
    doc.text(`Customer Token ID: ${token.substring(0, 10)}...`, 14, 40);
    doc.text(`Product: ${item.product.name}`, 14, 50);
    doc.text(`Price: INR ${item.product.price}`, 14, 60);
    doc.text(`Quantity: ${item.quantity}`, 14, 70);
    doc.text(`Total Payable: INR ${item.product.price * item.quantity}`, 14, 80);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 100);
    
    doc.save(`Invoice_${item.product.name.replace(/\s+/g, '_')}.pdf`);
    toast.info("Downloading Invoice...");
  };

  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const totalAmount = subtotal + deliveryCharges;

  if (loading) return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!cart.items.length) return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-white m-4 rounded shadow-sm">
      <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
           alt="empty" className="w-60 mb-4" />
      <h2 className="text-xl font-bold">Your cart is empty!</h2>
      <p className="text-gray-500 mb-6">Add items to it now.</p>
      <Link to="/" className="bg-blue-600 text-white px-12 py-3 rounded-sm font-bold shadow-md hover:bg-blue-700">
        Shop Now
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-4 px-2 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4">
        
        {/* LEFT COLUMN: PRODUCT LIST */}
        <div className="flex-1 space-y-3">
          <div className="bg-white p-4 shadow-sm rounded-sm flex justify-between items-center">
            <h1 className="text-lg font-bold">My Cart ({cart.items.length})</h1>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <ShieldCheck size={16} className="text-blue-600" />
              100% Authentic Products
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-sm overflow-hidden">
            {cart.items.map((item) => (
              <div key={item.product._id} className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <div className="w-28 h-28 mx-auto md:mx-0 flex-shrink-0">
                  <img src={item.product.image} alt="" className="w-full h-full object-contain" />
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <h2 className="text-base md:text-lg text-gray-800 line-clamp-1 hover:text-blue-600 cursor-pointer">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 uppercase">Seller: E-SHOP RETAIL</p>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-xl font-bold">₹{item.product.price.toLocaleString('en-IN')}</span>
                    <span className="text-sm text-gray-400 line-through">₹{(item.product.price * 1.4).toFixed(0)}</span>
                    <span className="text-sm text-green-600 font-bold">40% Off</span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <button onClick={() => downloadInvoice(item)} 
                            className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-blue-600 uppercase">
                      <FileText size={16} /> Invoice
                    </button>
                    <button onClick={() => handleRemove(item.product._id)}
                            className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-red-600 uppercase">
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="hidden md:block text-sm">
                  <p>Delivery by Sat Jan 11 | <span className="text-green-600 font-bold">Free</span></p>
                  <p className="text-xs text-gray-500 mt-1">7 Days Replacement Policy</p>
                </div>
              </div>
            ))}

            {/* Sticky Place Order Footer */}
            <div className="p-4 flex justify-end bg-white sticky bottom-0 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
              <button 
                onClick={() => navigate("/checkout")}
                className="bg-[#fb641b] text-white px-10 md:px-16 py-3 font-bold rounded-sm shadow-md hover:bg-[#f45c14] uppercase tracking-wide"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRICE DETAILS (STICKY) */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-white shadow-sm rounded-sm sticky top-20">
            <h2 className="text-gray-500 font-bold p-4 border-b uppercase text-sm">Price Details</h2>
            <div className="p-4 space-y-5">
              <div className="flex justify-between">
                <span>Price ({cart.items.length} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">- ₹{(subtotal * 0.1).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharges === 0 ? <><span className="line-through text-gray-400">₹40</span> <span className="text-green-600">Free</span></> : `₹${deliveryCharges}`}
                </span>
              </div>
              
              <div className="flex justify-between border-t border-dashed pt-5 text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="text-green-600 font-bold text-sm bg-green-50 p-2 border border-green-100 rounded-sm">
                You will save ₹{(subtotal * 0.1).toFixed(0)} on this order
              </div>
            </div>

            <div className="p-4 flex items-center gap-2 text-gray-500 text-xs font-bold border-t">
               <ShieldCheck size={20} /> SAFE AND SECURE PAYMENTS. EASY RETURNS.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}