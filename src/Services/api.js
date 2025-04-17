import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/counsellor';

export const loginCounsellor = async (email, pwd) => {
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('pwd', pwd); // match backend key exactly

  const res = await axios.post(`${BASE_URL}/login`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return res.data;
};





// Register API call
export const registerCounsellor = async (counsellor) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, JSON.stringify(counsellor), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};




export const fetchDashboard = async (counsellorId) => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard/${counsellorId}`);
    return res.data; // Should return { totalEnqs, openEnqs, enrollEnqs, lostEnqs }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};



export const addEnquiry = async (enquiryData, counsellorId) => {
  try {
    const response = await axios.post(`${BASE_URL}/enquiry/${counsellorId}`, enquiryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error occurred while adding enquiry";
  }
};



export const fetchEnquiriesByCounsellor = async (filterData, counsellorId) => {
  const response = await axios.post(
    `${BASE_URL}/filter?counsellorId=${counsellorId}`,  // Pass counsellorId as a query param
    filterData
  );
  return response.data;
};

export const deleteEnquiry = async (enquiryId) => {
  const res = await fetch(`${BASE_URL}/${enquiryId}`, {
      method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete enquiry');
  return await res.text(); // or JSON, based on your backend response
};




