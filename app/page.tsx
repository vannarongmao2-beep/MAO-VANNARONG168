import React from 'react';

export default function Dashboard(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] p-8">
      {/* Top Navigation / Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, Admin. Here is your family overview.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="bg-[#2563EB] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            + Quick Add
          </button>
          <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden border-2 border-white shadow-sm">
            {/* Profile Image Placeholder */}
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Income Card */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Monthly Income</h3>
          <p className="text-3xl font-bold text-[#22C55E] mt-2">$12,450.00</p>
        </div>

        {/* Expense Card */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Monthly Expense</h3>
          <p className="text-3xl font-bold text-[#EF4444] mt-2">$4,200.00</p>
        </div>

        {/* Savings Card */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Savings</h3>
          <p className="text-3xl font-bold text-[#2563EB] mt-2">$8,250,000.00</p>
        </div>

        {/* Net Worth Card */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Net Portfolio Valuation</h3>
          <p className="text-3xl font-bold text-[#8B5CF6] mt-2">$18,300,000.00</p>
        </div>
      </main>
    </div>
  );
}
