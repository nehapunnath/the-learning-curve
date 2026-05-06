import BASE_URL from './base_urls';

class EnquiryApi {

  // Submit new enquiry (Public)
  static async submitEnquiry(formData) {
    try {
      const response = await fetch(`${BASE_URL}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          studentName: formData.studentName,
          studentClass: formData.studentClass,
          mobile: formData.mobile,
          email: formData.email || '',
          place: formData.place,
          message: formData.message || '',
          acceptTerms: formData.acceptTerms || false,
          acceptNewsletter: formData.acceptNewsletter || false,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      return {
        success: true,
        message: data.message,
        enquiryId: data.enquiryId,
        data: data.data
      };

    } catch (error) {
      console.error('Enquiry submission error:', error);
      return {
        success: false,
        error: error.message || 'Something went wrong. Please try again.'
      };
    }
  }

  // Get all enquiries (Admin only)
  static async getAllEnquiries({ limit = 50, status = '', place = '' } = {}) {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      let url = `${BASE_URL}/enquiries?limit=${limit}`;
      if (status) url += `&status=${status}`;
      if (place) url += `&place=${place}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch enquiries');
      }

      return {
        success: true,
        enquiries: data.enquiries || [],
        count: data.count || 0
      };

    } catch (error) {
      console.error('Get enquiries error:', error);
      return {
        success: false,
        error: error.message || 'Failed to load enquiries'
      };
    }
  }

  // Get single enquiry by ID
  static async getEnquiryById(enquiryId) {
    try {
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${BASE_URL}/enquiries/${enquiryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch enquiry');
      }

      return {
        success: true,
        enquiry: data.enquiry
      };

    } catch (error) {
      console.error('Get enquiry by ID error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update enquiry status
  static async updateEnquiryStatus(enquiryId, status) {
    try {
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${BASE_URL}/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      return {
        success: true,
        message: data.message
      };

    } catch (error) {
      console.error('Update status error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete enquiry
  static async deleteEnquiry(enquiryId) {
    try {
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${BASE_URL}/enquiries/${enquiryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete enquiry');
      }

      return {
        success: true,
        message: 'Enquiry deleted successfully'
      };

    } catch (error) {
      console.error('Delete enquiry error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default EnquiryApi;