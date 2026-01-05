import React from "react";
import { FileText, Shield, Scale } from "lucide-react";

export default function CorporateInfo() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-10 border-b pb-4">Corporate Information</h1>
      
      <div className="space-y-12">
        <section>
          <h3 className="flex items-center gap-2 text-blue-600 font-bold mb-4 uppercase text-sm tracking-wider">
            <Scale size={18} /> Legal Entity
          </h3>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl">
            <strong>E-Shop Private Limited</strong> is a registered entity under the Companies Act. 
            CIN: U72200KA2025PTC000000. 
            Registered Office: Building 4, Tech Enclave, Outer Ring Road, Bangalore - 560103.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border border-gray-100 rounded-2xl">
            <FileText className="text-gray-400 mb-2" />
            <h4 className="font-bold">Investor Relations</h4>
            <p className="text-sm text-gray-500 mt-1">Access financial reports, annual filings, and governance documents.</p>
          </div>
          <div className="p-6 border border-gray-100 rounded-2xl">
            <Shield className="text-gray-400 mb-2" />
            <h4 className="font-bold">Sustainability</h4>
            <p className="text-sm text-gray-500 mt-1">Read about our carbon-neutral shipping initiatives for 2030.</p>
          </div>
        </section>
      </div>
    </div>
  );
}