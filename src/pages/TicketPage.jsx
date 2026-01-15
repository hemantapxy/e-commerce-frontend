import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Optional: npm install jspdf-autotable for better PDF tables
import { Download, Plane, Calendar, Clock, MapPin, CheckCircle } from "lucide-react";

export default function TicketPage() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Booking Found</h2>
          <p className="text-gray-600 mb-4">Please complete your payment to view the ticket.</p>
          <button onClick={() => window.history.back()} className="text-blue-600 font-semibold underline">Go Back</button>
        </div>
      </div>
    );
  }

  const { flight, passengers, amount, _id } = booking;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("E-TICKET CONFIRMATION", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Booking ID: ${_id}`, 20, 35);
    doc.text(`Status: CONFIRMED`, 20, 40);

    // Flight Box
    doc.rect(20, 45, 170, 40);
    doc.setFont("helvetica", "bold");
    doc.text(`${flight.airline} - ${flight.flightNumber}`, 25, 55);
    doc.setFont("helvetica", "normal");
    doc.text(`From: ${flight.from}`, 25, 65);
    doc.text(`To: ${flight.to}`, 25, 75);
    doc.text(`Departure: ${flight.departureTime}`, 100, 65);
    doc.text(`Arrival: ${flight.arrivalTime}`, 100, 75);

    // Passengers
    doc.text("PASSENGER DETAILS", 20, 100);
    const passengerData = passengers.map((p, i) => [i + 1, p.name, p.age, "Confirmed"]);
    doc.autoTable({
      startY: 105,
      head: [['#', 'Name', 'Age', 'Status']],
      body: passengerData,
    });

    doc.save(`Ticket_${_id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Banner */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center gap-3">
          <CheckCircle size={24} />
          <div>
            <h1 className="font-bold text-lg">Booking Confirmed!</h1>
            <p className="text-sm opacity-90">Your ticket has been sent to your registered email.</p>
          </div>
        </div>

        {/* Main Ticket Body */}
        <div className="bg-white shadow-xl overflow-hidden border-x border-b border-gray-200">
          
          {/* Ticket Header */}
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Booking ID</p>
              <h2 className="text-xl font-mono font-bold text-gray-800">{_id.substring(0, 12).toUpperCase()}</h2>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded flex items-center gap-2 border border-blue-100">
                <Plane className="text-blue-600" size={20} />
                <span className="font-bold italic">{flight.airline}</span>
                <span className="text-gray-400">|</span>
                <span className="font-medium">{flight.flightNumber}</span>
              </div>
            </div>
          </div>

          {/* Flight Route Visual */}
          <div className="p-8 bg-gradient-to-r from-white via-gray-50 to-white flex justify-between items-center relative">
            <div className="text-center z-10">
              <h3 className="text-3xl font-black text-gray-800">{flight.from}</h3>
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <Clock size={14} /> {flight.departureTime}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center px-4 relative">
              <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                <Plane className="absolute -top-3 left-1/2 -translate-x-1/2 text-gray-400 rotate-90" size={24} />
              </div>
              <span className="mt-4 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Non-Stop</span>
            </div>

            <div className="text-center z-10">
              <h3 className="text-3xl font-black text-gray-800">{flight.to}</h3>
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <Clock size={14} /> {flight.arrivalTime}
              </p>
            </div>
          </div>

          {/* Passenger & Detailed Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t">
            <div className="p-6 border-r border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-tighter">Travelers</h4>
              <ul className="space-y-3">
                {passengers.map((p, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium font-mono uppercase">{p.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{p.age} YRS</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-gray-50/50">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="font-bold text-green-600 italic uppercase">Confirmed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Fare Paid</span>
                  <span className="font-bold text-gray-800">₹{amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Class</span>
                  <span className="font-bold text-gray-800 italic">Economy (V)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer / Barcode Placeholder */}
          <div className="p-6 bg-white border-t flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-gray-400 max-w-xs text-center md:text-left">
              * Please carry a valid Photo ID and reach the airport 2 hours before departure.
            </div>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95"
            >
              <Download size={18} />
              DOWNLOAD E-TICKET
            </button>
          </div>

        </div>

        {/* Helpful Tip */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Need help? Contact our 24/7 support at <strong>support@travelconnect.com</strong>
        </p>
      </div>
    </div>
  );
}