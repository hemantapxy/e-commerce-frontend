import React, { useEffect, useState } from "react";
import api from "../api"; // your axios instance
import { Package, Power, ChevronRight, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // Combined State from both snippets
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🔹 Fetch Profile Logic (Preserved)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Merging the data structure from both snippets
        setUser({
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone || "",
          address: res.data.address || "",
          profileImage: res.data.profileImage,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // 🔹 Handle File Selection (Logic from Code 1)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    setImageFile(file);
  };

  // 🔹 Handle Image Upload (Logic from Code 1)
  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const res = await api.put("/user/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser({ ...user, profileImage: res.data.image });
      setImageFile(null); // Reset file after success
      alert("Profile image updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Update Profile Text (Logic from Code 2)
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(user.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      await api.put(
        "/user/profile",
        {
          username: user.username,
          phone: user.phone,
          address: user.address,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-10">
      <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-500">
        Account › <span className="text-gray-900 font-semibold">Profile Information</span>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
          
          {/* LEFT SIDEBAR */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white p-3 flex items-center gap-4 mb-4 shadow-sm rounded-sm">
              <div className="relative group">
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : user.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                {/* Overlay for file input */}
                <label className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera size={16} className="text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <div className="overflow-hidden">
                <p className="text-xs text-gray-500">Hello,</p>
                <p className="font-bold text-[16px] truncate">{user.username}</p>
                
                {/* Upload Action Button from Code 1 */}
                {imageFile && (
                  <button
                    onClick={handleImageUpload}
                    disabled={uploading}
                    className="text-[11px] text-[#2874f0] font-bold block mt-1 hover:underline"
                  >
                    {uploading ? "Uploading..." : "CONFIRM UPLOAD"}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <ul className="text-sm">
                <Link to="/orders" className="flex items-center justify-between p-4 border-b hover:bg-[#f1f3f6]">
                  <div className="flex items-center gap-3">
                    <Package size={20} className="text-[#2874f0]" />
                    <span className="font-bold uppercase text-[14px]">My Orders</span>
                  </div>
                  <ChevronRight size={18} />
                </Link>

                <div onClick={handleLogout} className="flex items-center gap-3 p-4 hover:bg-red-50 cursor-pointer transition-colors">
                  <Power size={20} className="text-[#2874f0]" />
                  <span className="font-bold uppercase text-[14px]">Logout</span>
                </div>
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT (Form) */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white shadow-sm rounded-sm p-6 md:p-8">
              <h2 className="text-[18px] font-bold mb-8">Personal Information</h2>

              <form onSubmit={handleTextSubmit} className="space-y-8">
                <div className="max-w-md">
                  <label className="block text-sm mb-2 text-gray-600">Full Name</label>
                  <input
                    type="text"
                    className="w-full border px-4 py-2.5 rounded-sm focus:border-[#2874f0] outline-none"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    required
                  />
                </div>

                <div className="max-w-md">
                  <label className="block text-sm mb-2 text-gray-600">Email Address</label>
                  <input type="email" disabled className="w-full border bg-gray-100 px-4 py-2.5 rounded-sm cursor-not-allowed" value={user.email} />
                </div>

                <div className="max-w-md">
                  <label className="block text-sm mb-2 text-gray-600">Mobile Number</label>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full border px-4 py-2.5 rounded-sm focus:border-[#2874f0] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-600">Shipping Address</label>
                  <textarea
                    className="w-full border p-4 rounded-sm h-32 focus:border-[#2874f0] outline-none"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="bg-[#fb641b] text-white px-10 py-3 font-bold rounded-sm shadow hover:bg-[#e65a16] transition-colors">
                  SAVE CHANGES
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}