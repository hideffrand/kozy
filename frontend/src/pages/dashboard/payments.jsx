import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";
import PaymentModal from "../../components/payment-modal";

import { jsPDF } from "jspdf";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/payments`);
        if (!res.ok) {
          console.error("Error fetching payment records.");
          return;
        }

        const parsed = await res.json();
        setPayments(parsed.data);
        console.log(parsed.data);
      } catch (error) {
        console.error("Error fetching payment records:", error);
      }
    };

    fetchPayments();
  }, []);

  const handlePaymentAdd = (newPayment) => {
    setPayments((prev) => [...prev, newPayment]);
  };
  const tableRef = useRef(null);
  const exportToPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("IBDA Kost", 10, 10);

    doc.html(tableRef.current, {
      margin: [2, 2, 2, 2],
      x: 7,
      y: 17,
      autoPaging: true,
      callback: (doc) => {
        doc.save("transactions.pdf");
      },
      html2canvas: {
        scale: 0.2,
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold text-purple-700">Payments</h1>
        <span className="space-x-2">
          <button
            onClick={exportToPDF}
            className="bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            Export to PDF
          </button>
          <PaymentModal onPaymentAdd={handlePaymentAdd} />
        </span>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table
          ref={tableRef}
          className="min-w-full border-collapse bg-white text-left shadow-sm"
        >
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 font-semibold text-sm">Payment ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Timestamp</th>
              <th className="py-3 px-4 font-semibold text-sm">Method</th>
              <th className="py-3 px-4 font-semibold text-sm">Water</th>
              <th className="py-3 px-4 font-semibold text-sm">Wifi</th>
              <th className="py-3 px-4 font-semibold text-sm">Electricity</th>
              <th className="py-3 px-4 font-semibold text-sm">Payroll</th>
              <th className="py-3 px-4 font-semibold text-sm">Additional</th>
              <th className="py-3 px-4 font-semibold text-sm">Total</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-purple-50 ${
                  i % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-gray-700">
                  {payment.payment_id}
                </td>
                <td className="py-3 px-4 text-gray-700">{payment.timestamp}</td>
                <td className="py-3 px-4 text-gray-700">{payment.via}</td>
                <td className="py-3 px-4 text-gray-700">{payment.water}</td>
                <td className="py-3 px-4 text-gray-700">{payment.wifi}</td>
                <td className="py-3 px-4 text-gray-700">
                  {payment.electricity}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {payment.spv_payroll}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {payment.additional}
                </td>
                <td className="py-3 px-4 text-gray-700">{payment.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No payment records found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
