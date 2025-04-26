import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../hooks";
import { jsPDF } from "jspdf";
import { toRupiah } from "../../utils";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const { user, revalidateUser } = useAuth();

  const checkAndUpdatePenalties = async (transactions) => {
    const today = new Date();
    const updatedTransactions = [...transactions];
    let hasUpdates = false;

    for (const transaction of transactions) {
      const dueDate = new Date(transaction.due_date);
      const daysDiff = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

      if (daysDiff > 5 && !transaction.paid_at && transaction.penalty === 0) {
        await handlePenalty(transaction.transaction_id);
        hasUpdates = true;
      }
    }

    if (hasUpdates) {
      if (user?.role === "spv") {
        await fetchTransactionsForSPV();
      } else if (user?.role === "owner") {
        await fetchTransactionsForOwner();
      } else if (user?.role === "customer") {
        await fetchTransactionsForCustomer();
      }
    }
  };

  const fetchTransactionsForOwner = async () => {
    const res = await fetch(`${API_BASE_URL}/transactions`);
    if (!res.ok) return;

    const parsed = await res.json();
    setTransactions(parsed.data);
    await checkAndUpdatePenalties(parsed.data);
  };

  const fetchTransactionsForSPV = async () => {
    const res = await fetch(
      `${API_BASE_URL}/transactions?outlet_id=${user?.outletId}`
    );
    if (!res.ok) return;

    const parsed = await res.json();
    setTransactions(parsed.data);
    await checkAndUpdatePenalties(parsed.data);
  };

  const fetchTransactionsForCustomer = async () => {
    const res = await fetch(
      `${API_BASE_URL}/transactions?user_id=${user?.user_id}`
    );
    if (!res.ok) return;

    const parsed = await res.json();
    setTransactions(parsed.data);
    await checkAndUpdatePenalties(parsed.data);
  };

  const handlePayment = async (tid) => {
    const res = await fetch(`${API_BASE_URL}/transactions/${tid}/pay`, {
      method: "POST",
    });
    if (!res.ok) return;

    const parsed = await res.json();
    console.log(parsed);
    alert("Payment Success!");
    revalidateUser();
    window.location.reload();
  };

  const handlePenalty = async (tid) => {
    try {
      const res = await fetch(`${API_BASE_URL}/transactions/${tid}/penalty`, {
        method: "POST",
      });
      if (!res.ok) return;

      const parsed = await res.json();
      console.log(parsed);
      revalidateUser();
    } catch (error) {
      console.error("Error applying penalty:", error);
    }
  };

  const tableRef = useRef(null);
  const exportToPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Kozy", 10, 10);

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

  useEffect(() => {
    if (user?.role === "spv") {
      fetchTransactionsForSPV();
    }
    if (user?.role === "owner") {
      fetchTransactionsForOwner();
    }
    if (user?.role === "customer") {
      fetchTransactionsForCustomer();
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold text-purple-700">Transactions</h1>

        <button
          onClick={exportToPDF}
          className="bg-purple-700 text-white py-2 px-4 rounded-md"
        >
          Export to PDF
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table
          ref={tableRef}
          className="min-w-full border-collapse bg-white text-left shadow-sm"
        >
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 font-semibold text-sm">
                Transaction ID
              </th>
              <th className="py-3 px-4 font-semibold text-sm">User ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Outlet ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Room ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Cost</th>
              <th className="py-3 px-4 font-semibold text-sm">Penalty</th>
              <th className="py-3 px-4 font-semibold text-sm">Total</th>
              <th className="py-3 px-4 font-semibold text-sm">Paid At</th>
              <th className="py-3 px-4 font-semibold text-sm">Status</th>
              <th className="py-3 px-4 font-semibold text-sm">Due Date</th>

              {user?.role === "customer" && (
                <th className="py-3 px-4 font-semibold text-sm">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-purple-50 ${
                  i % 2 === 0 ? "bg-grey-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-gray-700">
                  {transaction.transaction_id}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {transaction.user_id}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {transaction.outlet_id}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {transaction.room_id}
                </td>
                <td className="py-3 px-4 text-gray-700">{transaction.cost}</td>
                <td className="py-3 px-4 text-gray-700">
                  {toRupiah(transaction.penalty)}
                </td>
                <td className="py-3 px-4 text-gray-700">{transaction.total}</td>
                <td className="py-3 px-4 text-gray-700">
                  {transaction.paid_at ? transaction.paid_at : "Not Paid"}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      transaction.paid_at
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.paid_at ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {transaction.due_date}
                </td>
                <td>
                  {user?.role === "customer" && !transaction.paid_at && (
                    <button
                      onClick={() => handlePayment(transaction.transaction_id)}
                      className="bg-purple-700 text-white py-1 px-3 rounded-md hover:bg-purple-800"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions?.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No transaction records found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
