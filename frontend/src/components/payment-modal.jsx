import React from 'react';
import { useState } from 'react';

const PaymentModal = ({ onPaymentAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    timestamp: "",
    via: "Cash",
    proof: null,
    water: 0,
    wifi: 0,
    electricity: 0,
    spv_payroll: 0,
    additional: 0,
    total: 0,
  });

  const calculateTotal = (formData) => {
    const numericFields = ['water', 'wifi', 'electricity', 'spv_payroll', 'additional'];
    return numericFields.reduce((sum, field) => {
      const value = parseFloat(formData[field]) || 0;
      return sum + value;
    }, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const newForm = {
        ...prev,
        [name]: value
      };
      
      // Only recalculate total if the changed field is a payment field
      if (['water', 'wifi', 'electricity', 'spv_payroll', 'additional'].includes(name)) {
        newForm.total = calculateTotal(newForm);
      }
      
      return newForm;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({
      ...prev,
      proof: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Append all form fields to FormData
      Object.keys(form).forEach(key => {
        if (key === 'proof' && form[key]) {
          formData.append('proof', form[key]);
        } else {
          formData.append(key, form[key]);
        }
      });

      const res = await fetch(`${API_BASE_URL}/payments`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add payment");
      const data = await res.json();
      
      onPaymentAdd(data);
      setIsOpen(false);
      setForm({
        timestamp: "",
        via: "Cash",
        proof: null,
        water: 0,
        wifi: 0,
        electricity: 0,
        spv_payroll: 0,
        additional: 0,
        total: 0,
      });
    } catch (err) {
      console.error("Error adding payment:", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md transition-colors"
      >
        Add Payment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Payment</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="timestamp" className="text-right text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  id="timestamp"
                  name="timestamp"
                  type="date"
                  value={form.timestamp}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="via" className="text-right text-sm font-medium text-gray-700">
                  Method
                </label>
                <select
                  id="via"
                  name="via"
                  value={form.via}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                  <option value="Cash">Cash</option>
                  <option value="Cashless">Cashless</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="proof" className="text-right text-sm font-medium text-gray-700">
                  Proof
                </label>
                <div className="col-span-3">
                  <input
                    id="proof"
                    name="proof"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">Upload payment proof image</p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="water" className="text-right text-sm font-medium text-gray-700">
                  Water
                </label>
                <input
                  id="water"
                  name="water"
                  type="number"
                  value={form.water}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="wifi" className="text-right text-sm font-medium text-gray-700">
                  WiFi
                </label>
                <input
                  id="wifi"
                  name="wifi"
                  type="number"
                  value={form.wifi}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="electricity" className="text-right text-sm font-medium text-gray-700">
                  Electricity
                </label>
                <input
                  id="electricity"
                  name="electricity"
                  type="number"
                  value={form.electricity}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="spv_payroll" className="text-right text-sm font-medium text-gray-700">
                  Payroll
                </label>
                <input
                  id="spv_payroll"
                  name="spv_payroll"
                  type="number"
                  value={form.spv_payroll}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="additional" className="text-right text-sm font-medium text-gray-700">
                  Additional
                </label>
                <input
                  id="additional"
                  name="additional"
                  type="number"
                  value={form.additional}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="total" className="text-right text-sm font-medium text-gray-700">
                  Total
                </label>
                <input
                  id="total"
                  name="total"
                  type="number"
                  value={form.total}
                  onChange={handleChange}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-100"
                  readOnly
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;