import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   // ← Add this
import EnquiryApi from "../Services/EnquiryApi";
import AuthApi from "../Services/AuthApi";           // ← Add this
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const navigate = useNavigate();   // ← Add this
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus]);

  const fetchEnquiries = async () => {
    setLoading(true);
    const result = await EnquiryApi.getAllEnquiries({ 
      limit: 100, 
      status: filterStatus 
    });

    if (result.success) {
      setEnquiries(result.enquiries);
    } else {
      toast.error(result.error || "Failed to load enquiries");
    }
    setLoading(false);
  };

  // Logout Handler
  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    const result = await AuthApi.logout();

    if (result.success) {
      toast.success("Logged out successfully");
      navigate('/');   // Redirect to login page
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    const result = await EnquiryApi.updateEnquiryStatus(enquiryId, newStatus);
    if (result.success) {
      toast.success("Status updated successfully");
      fetchEnquiries();
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const handleDelete = async (enquiryId) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    
    const result = await EnquiryApi.deleteEnquiry(enquiryId);
    if (result.success) {
      toast.success("Enquiry deleted successfully");
      fetchEnquiries();
    } else {
      toast.error(result.error || "Failed to delete enquiry");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openMessage = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  return (
    <div className="p-6">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Enquiries Management</h1>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium"
          >
          
            Logout
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex justify-end mb-6">
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Enquiries</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <button
            onClick={fetchEnquiries}
            className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Rest of your table code remains same */}
      {loading ? (
        <div className="text-center py-10">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow">
          <p className="text-gray-500 text-lg">No enquiries found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Student Name</th>
                <th className="px-6 py-4 text-left">Parent Name</th>
                <th className="px-6 py-4 text-left">Class</th>
                <th className="px-6 py-4 text-left">Mobile</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Message</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {enquiries.map((enq) => (
                <tr key={enq.enquiryId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{enq.studentName}</td>
                  <td className="px-6 py-4">{enq.parentName}</td>
                  <td className="px-6 py-4">{enq.studentClass}</td>
                  <td className="px-6 py-4">{enq.mobile}</td>
                  <td className="px-6 py-4">{enq.place}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(enq.createdAt)}
                  </td>

                  <td className="px-6 py-4">
                    {enq.message ? (
                      <button
                        onClick={() => openMessage(enq)}
                        className="text-orange-600 hover:text-orange-700 underline text-sm"
                      >
                        View Message
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.enquiryId, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer
                        ${enq.status === 'new' ? 'bg-blue-100 text-blue-700' : ''}
                        ${enq.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${enq.status === 'closed' ? 'bg-red-100 text-red-700' : ''}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(enq.enquiryId)}
                      className="text-red-600 hover:text-red-800 transition px-3 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full mx-4 p-6">
            <h3 className="text-xl font-semibold mb-4">Message from Parent</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {selectedEnquiry.message}
            </p>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default AdminDashboard;