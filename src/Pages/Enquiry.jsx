// Enquiry.jsx
import React, { useState } from "react";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    place: "",
    message: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);

  const locations = [
    "Indiranagar",
    "Whitefield",
    "E city 1",
    "E city 2",
    "Jayanagar",
    "Sarjapura"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      acceptTerms,
      acceptNewsletter,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">
            The Learning Curve
          </h1>
        </div>
      </header>

      {/* ORANGE BANNER */}
      <div className="bg-orange-500 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            THE LEARNING CURVE
          </h2>
          <p className="text-xl text-orange-100 mt-2 font-medium">
            Preschool & Daycare
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-8xl mx-auto px-4 py-10">
        {/* BUSINESS CARD - White Background with Shadow */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-10">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* LEFT SECTION */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                The Learning Curve | Best Preschool & Daycare
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Daycare & Preschool Preschool in 6 Locations of Bengaluru,Karnataka
              </p>

              <div className="flex flex-wrap gap-1 mt-3">
            {locations.map((loc) => (
              <span key={loc} className="text-orange-700 px-2 py-1 rounded-full text-sm font-medium">
                {loc}
              </span>
            ))}
          </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-5">
                <button className="px-5 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-100 transition">
                  Write Reviews
                </button>

                <button className="px-5 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-100 transition">
                  Drive Direction
                </button>

                <button className="px-6 py-2 bg-[#1DA1C2] text-white rounded-md text-sm font-semibold hover:bg-[#178aa6] transition">
                  Call
                </button>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col justify-between min-w-[280px]">
              {/* TOP ROW */}
              <div className="flex justify-between items-center text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🕒</span>
                  <span>
                    <span className="text-green-600 font-medium">Open Now</span>{" "}
                    <span className="text-gray-600">Closes at 7:00 PM</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg">📞</span>
                  <span>08037016780</span>
                </div>
              </div>

              {/* GOOGLE + REVIEWS */}
              <div className="mt-4 flex items-start gap-3">
                <span className="text-xl font-bold text-blue-600">G</span>

                <div className="text-sm text-gray-700 leading-tight">
                  <p>
                    13 Reviews of Preschool in Electronic City Phase 2 (5)
                  </p>

                  {/* STARS */}
                  <div className="text-orange-500 mt-1 text-base">
                    ★★★★★
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
                <span className="text-lg">🏫</span>
                <span>Preschool Locator</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* ENQUIRY SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
            Enquire about Preschool Admissions in 6 Locations of Bengaluru
          </h2>
          <p className="text-gray-600 text-lg">
            At The Learning Curve | Best Preschool & Daycare
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {locations.map((loc) => (
              <span key={loc} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* ENQUIRY SECTION - Orange bg left, Form right */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Orange Background */}
            <div className="bg-orange-500 p-8 flex flex-col justify-center items-center text-center">
              <div className="text-white">
                {/* <div className="text-5xl mb-4">🎓</div> */}
                {/* <h3 className="text-2xl font-bold mb-3">Start Early</h3> */}
                <p className="text-orange-100 mb-4">Admissions Open 2026-27</p>
                <div className="bg-orange-400 inline-block px-6 py-3 rounded-lg">
                  <p className="font-semibold">ENROLL NOW TO AVAIL</p>
                  <p className="text-xl font-bold">SPECIAL OFFERS</p>
                </div>
                {/* <p className="mt-4 text-xl font-bold">📞 9819622455</p> */}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Connect with Us!
              </h3>
              <p className="text-gray-600 mb-6 pb-2 border-b border-gray-200">
                Fill the form to get more information
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Preferred Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select your preferred location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Tell us more (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Any specific questions or requirements?"
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded "
                    />
                    <span className="text-gray-700 text-sm p-3">
                      Accept terms & conditions, receive calls, notifications on WhatsApp
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptNewsletter}
                      onChange={(e) => setAcceptNewsletter(e.target.checked)}
                      className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700 text-sm p-3">
                      Hereby accept to send me newsletters for marketing and promotional content
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;