// // src/services/EnquiryApi.js
// import BASE_URL from './base_urls';

// class EnquiryApi {
//   /**
//    * Submit enquiry form
//    * @param {Object} enquiryData - Enquiry form data
//    * @param {string} enquiryData.name - Full name
//    * @param {string} enquiryData.mobile - Mobile number
//    * @param {string} enquiryData.email - Email address (optional)
//    * @param {string} enquiryData.place - Preferred location
//    * @param {string} enquiryData.message - Additional message (optional)
//    * @param {boolean} enquiryData.acceptTerms - Accept terms & conditions
//    * @param {boolean} enquiryData.acceptNewsletter - Subscribe to newsletter
//    * @returns {Promise<{success: boolean, message?: string, data?: object, error?: string}>}
//    */
//   static async submitEnquiry(enquiryData) {
//     try {
//       const response = await fetch(`${BASE_URL}/submit`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(enquiryData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Handle validation errors
//         if (data.errors && data.errors.length > 0) {
//           throw new Error(data.errors[0]);
//         }
//         throw new Error(data.message || 'Failed to submit enquiry');
//       }

//       return {
//         success: true,
//         message: data.message,
//         data: data.data
//       };
//     } catch (error) {
//       console.error('Submit enquiry error:', error);
//       return {
//         success: false,
//         error: error.message || 'Network error. Please try again.'
//       };
//     }
//   }

//   /**
//    * Health check for enquiry API
//    * @returns {Promise<{success: boolean, message?: string}>}
//    */
//   static async healthCheck() {
//     try {
//       const response = await fetch(`${BASE_URL}/health`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();

//       return {
//         success: data.success,
//         message: data.message
//       };
//     } catch (error) {
//       console.error('Health check error:', error);
//       return {
//         success: false,
//         error: error.message
//       };
//     }
//   }
// }

// export default EnquiryApi;