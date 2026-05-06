// Enquiry.jsx
import React, { useState } from "react";
import EnquiryApi from "../Services/Enquiryapi";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    place: "",
    message: "",
    studentName: "",
    studentClass: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const locations = [
    "Indiranagar",
    "Whitefield",
    "E city 1",
    "E city 2",
    // "Jayanagar",
  ];

  const classes = [
    "Playgroup",
    "Nursery",
    "LKG",
    "UKG",
    "1st Standard",
    "2nd Standard",
    "3rd Standard",
    "4th Standard",
    "5th Standard"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await EnquiryApi.submitEnquiry({
        name: formData.name,
        studentName: formData.studentName,
        studentClass: formData.studentClass,
        mobile: formData.mobile,
        email: formData.email,
        place: formData.place,
        message: formData.message,
        acceptTerms: acceptTerms,
        acceptNewsletter: acceptNewsletter,
      });

      if (result.success) {
        setShowSuccessModal(true);        // ← Show Modal
        // Reset form
        setFormData({
          name: "", mobile: "", email: "", place: "", message: "",
          studentName: "", studentClass: ""
        });
        setAcceptTerms(false);
        setAcceptNewsletter(false);
      } else {
        setMessage({ type: 'error', text: result.error || "Failed to submit enquiry" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({ type: 'error', text: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  // Close Success Modal
  const closeModal = () => {
    setShowSuccessModal(false);
  };

  // SVG Components
  const ClockIcon = () => (
    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const LocationIcon = () => (
    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const StarIcon = () => (
    <svg className="w-4 h-4 text-orange-500 inline-block" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const BuildingIcon = () => (
    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const EnvelopeIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const GraduationCapIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  );

  const ChatIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const WriteIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const DirectionIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );

  const CallIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const LoginIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-['Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      {/* HEADER with subtle animation and login button */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
              The Learning Curve
            </h1>
          </div>
           <Link
            to="/login" 
            className="flex items-center text-decoration-none gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            Login
          </Link>
        </div>
      </header>

      {/* ORANGE BANNER with enhanced styling and decorative SVGs */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-0 left-0 w-64 h-64 text-white" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="20" cy="20" r="8" />
            <circle cx="80" cy="30" r="12" />
            <circle cx="50" cy="80" r="10" />
            <circle cx="90" cy="70" r="6" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-md">
            THE LEARNING CURVE
          </h2>
          <p className="text-xl text-orange-100 mt-2 font-medium flex items-center justify-center gap-2">
            <GraduationCapIcon />
            Preschool & Daycare
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-8xl mx-auto px-4 py-10">
        {/* BUSINESS CARD - Enhanced White Background with Hover Effect */}
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 mb-10">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* LEFT SECTION */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <BuildingIcon />
                <h3 className="text-xl font-bold text-gray-900 leading-snug bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  The Learning Curve | Best Preschool & Daycare
                </h3>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Daycare & Preschool Preschool in 4 Locations of Bengaluru, Karnataka
              </p>

              <div className="flex flex-wrap gap-1 mt-3">
                {locations.map((loc, idx) => (
                  <span key={loc} className="text-orange-700 px-2 py-1 rounded-full text-sm font-medium hover:bg-orange-50 transition-colors duration-200 cursor-default flex items-center gap-1">
                    <LocationIcon />
                    {loc}
                  </span>
                ))}
              </div>

              {/* BUTTONS with hover animations and SVG icons */}
              <div className="flex gap-4 mt-5">
                <button className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-sm flex items-center">
                  <WriteIcon />
                  Write Reviews
                </button>

                <button className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-sm flex items-center">
                  <DirectionIcon />
                  Drive Direction
                </button>

                <button className="px-6 py-2 bg-gradient-to-r from-[#1DA1C2] to-[#178aa6] text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center">
                  <CallIcon />
                  Call
                </button>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col justify-between min-w-[280px] bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner">
              {/* TOP ROW */}
              <div className="flex justify-between items-center text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <span>
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircleIcon />
                      Open Now
                    </span>{" "}
                    <span className="text-gray-500">Closes at 7:00 PM</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <span className="font-medium">08037016780</span>
                </div>
              </div>

              {/* GOOGLE + REVIEWS */}
              <div className="mt-4 flex items-start gap-3">
                <GoogleIcon />
                <div className="text-sm text-gray-700 leading-tight">
                  <p className="font-medium">
                    13 Reviews of Preschool in Electronic City Phase 2 (5)
                  </p>

                  {/* STARS with animation */}
                  <div className="text-orange-500 mt-1 text-base flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200 cursor-pointer">
                <BuildingIcon />
                <span className="font-medium">Preschool Locator</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ENQUIRY SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
            <GraduationCapIcon />
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 tracking-tight">
              Enquire about Preschool Admissions in 4 Locations of Bengaluru
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            At The Learning Curve | Best Preschool & Daycare
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center lg:justify-start">
            {locations.map((loc) => (
              <span key={loc} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors duration-200 cursor-default flex items-center gap-1">
                <LocationIcon />
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Message Display with animation */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl shadow-sm transform transition-all duration-300 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'success' && <CheckCircleIcon />}
              {message.type !== 'success' && <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
              {message.text}
            </div>
          </div>
        )}

        {/* ENQUIRY SECTION - Enhanced design with shadow and animation */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Orange Background with Pattern and Decor */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="absolute top-0 left-0 w-full h-full" fill="none" viewBox="0 0 400 400">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="350" cy="300" r="60" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="100" cy="350" r="30" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="300" cy="50" r="25" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="relative z-10 text-white">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-orange-100 mb-4 text-lg">Admissions Open 2026-27</p>
                <div className="bg-white/20 backdrop-blur-sm inline-block px-8 py-4 rounded-xl shadow-lg border border-white/30">
                  <p className="font-semibold tracking-wide">ENROLL NOW TO AVAIL</p>
                  <p className="text-2xl font-bold tracking-wider">SPECIAL OFFERS</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form with enhanced styling and SVG icons */}
            <div className="p-6 md:p-8 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <ChatIcon />
                <h3 className="text-2xl font-bold text-gray-800">
                  Connect with Us!
                </h3>
              </div>
              <p className="text-gray-500 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                <EnvelopeIcon />
                Fill the form to get more information
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="transform transition-all duration-200 focus-within:scale-[1.01]">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm flex items-center gap-2">
                    Parent Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Enter parent's name"
                  />
                </div>

                <div className="transform transition-all duration-200 focus-within:scale-[1.01]">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm flex items-center gap-2">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Enter student's name"
                  />
                </div>

                <div className="transform transition-all duration-200 focus-within:scale-[1.01]">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm flex items-center gap-2">
                    {/* <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg> */}
                    Class/Grade <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="studentClass"
                    value={formData.studentClass}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 appearance-none cursor-pointer hover:border-orange-300"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.25rem',
                    }}
                  >
                    <option value="">Select class/grade</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="transform transition-all duration-200 focus-within:scale-[1.01]">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm flex items-center gap-2">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="transform transition-all duration-200 focus-within:scale-[1.01]">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm flex items-center gap-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="transform transition-all duration-200 focus-within:scale-[1.01]">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm flex items-center gap-2">
                    Preferred Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 appearance-none cursor-pointer hover:border-orange-300"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.25rem',
                    }}
                  >
                    <option value="">Select your preferred location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="transform transition-all duration-200 focus-within:scale-[1.01]">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm flex items-center gap-2">
                    Tell us more (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    disabled={loading}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 bg-gray-50/50 hover:bg-white resize-none"
                    placeholder="Any specific questions or requirements?"
                  ></textarea>
                </div>

                <div className="space-y-3 bg-gradient-to-r from-gray-50 to-orange-50/30 p-4 rounded-xl border border-orange-100">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      required
                      disabled={loading}
                      className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-all duration-200 group-hover:border-orange-400"
                    />
                    <span className="text-gray-700 text-sm p-2">
                      Accept terms & conditions, receive calls, notifications on WhatsApp
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={acceptNewsletter}
                      onChange={(e) => setAcceptNewsletter(e.target.checked)}
                      disabled={loading}
                      className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded transition-all duration-200 group-hover:border-orange-400"
                    />
                    <span className="text-gray-700 text-sm p-2">
                      Hereby accept to send me newsletters for marketing and promotional content
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <>
                    
                      Submit
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
     {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center text-white">
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Thank You!</h2>
              <p className="mt-2 text-green-100">Your enquiry has been submitted successfully.</p>
            </div>

            <div className="p-8 text-center">
              <p className="text-gray-600 leading-relaxed">
                Our team will contact you shortly.
              </p>

              <button
                onClick={closeModal}
                className="mt-8 w-full py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiry;