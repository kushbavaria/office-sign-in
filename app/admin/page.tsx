'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'; // Default password, should be changed in env

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      loadVisitors();
    } else {
      setError('Invalid password');
    }
  };

  const loadVisitors = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/visitors');
      if (response.ok) {
        const data = await response.json();
        setVisitors(data);
      }
    } catch (error) {
      console.error('Error loading visitors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await fetch('/api/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `visitor-sign-in-${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Failed to export Excel file');
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all visitor data? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/clear', { method: 'POST' });
      if (response.ok) {
        setVisitors([]);
        alert('Visitor data cleared successfully');
      } else {
        alert('Failed to clear visitor data');
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('Failed to clear visitor data');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-2 border-black">
          <h1 className="text-2xl font-bold text-black mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <div className="p-3 bg-white border-2 border-black rounded-lg">
                <p className="text-black text-sm">{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-white hover:text-black focus:ring-4 focus:ring-gray-300 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-black">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
              <p className="text-black">Manage visitor sign-in data</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 border-2 border-black rounded-lg text-black hover:bg-white transition"
            >
              Logout
            </button>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={handleExportExcel}
              className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-white hover:text-black focus:ring-4 focus:ring-gray-300 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export to Excel
            </button>
            <button
              onClick={handleClearData}
              className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-white hover:text-black focus:ring-4 focus:ring-gray-300 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All Data
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-black">Loading visitor data...</p>
            </div>
          ) : visitors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-black">No visitor data available</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b-2 border-black">
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Citizenship</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">NDA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Citizenship Declaration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-black">
                  {visitors.map((visitor, index) => (
                    <tr key={index} className="hover:bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {new Date(visitor.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {visitor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {visitor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {visitor.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {visitor.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {visitor.citizenship}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {visitor.ndaAgreed ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-white text-black border-2 border-black">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black text-white border-2 border-black">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {visitor.citizenshipDeclaration ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-white text-black border-2 border-black">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black text-white border-2 border-black">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 p-4 bg-white border-2 border-black rounded-lg">
            <p className="text-sm text-black">
              <strong>Total Visitors:</strong> {visitors.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}