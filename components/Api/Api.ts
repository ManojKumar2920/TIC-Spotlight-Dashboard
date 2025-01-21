import axios from 'axios';

//fetch campaigns and users for admin page 
export const fetchUserCampaignsForAdmin = async () => {
  try {
    const response = await axios.get('/api/admin', {
      withCredentials: true,
    });
    return response.data.campaigns;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to fetch campaigns');
    } else {
      throw new Error('Failed to fetch campaigns');
    }
  }
};


// Updating Status of campaing from the admin Page
export const updateCampaignStatus = async (selectedCampaignIds: string[], status: string) => {
  try {
    const response = await axios.put('/api/admin', {
      campaignIds: selectedCampaignIds,
      status,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      console.log('Status updated successfully:', response.data);
      return response.data;
    } else {
      console.error('Error updating status', response.data);
      throw new Error(response.data.message || 'Failed to update status');
    }
  } catch (error: any) {
    console.error('Error updating status:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to update status');
    } else {
      throw new Error('Failed to update status');
    }
  }
};


//Fetching user Campaings
export const fetchUserCampaigns = async () => {
  try {
    const response = await axios.get('/api/user-campaigns', {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data.campaigns;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to fetch campaigns.');
    } else {
      throw new Error('Failed to fetch campaigns.');
    }
  }
};





//Update Use rprofile 
export const updateProfile = async (profileData: {
  phoneNumber: string;
  companyName: string;
  gstn: string;
  companyAddress: string;
  billingAddress: string;
}) => {
  try {
    const response = await axios.put('/api/profile', profileData);

    if (response.status === 200) {
      return { success: true, message: "Profile updated successfully!" };
    } else {
      return { success: false, message: "Failed to update profile. Please try again." };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred while updating the profile.",
    };
  }
};





//User Profile
export const fetchUserProfile = async () => {
  try {
    const response = await axios.get('/api/user');
    if (response.status === 200) {
      return response.data.user; 
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};




//Login
export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/signin', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Failed to sign in.');
    } else {
      throw new Error('Failed to sign in.');
    }
  }
};



export const loginWithGoogle = () => {
    const authUrl = `/api/google-auth`; 
    window.location.href = authUrl;
};


//Logout
export const signout = async () => {
  try {
    const response = await axios.post('/api/signout', {}, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (err) {
    console.error('Error logging out:', err);
    throw err;
  }
};


