"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import LabelInput from "@/components/ReusableComponents/LabelInput";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("Token is missing or invalid.");
    }
  }, [searchParams]);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !token) {
      toast.error("new password is required."); 
      return;
    }

    // Validate password
    if (!validatePassword(newPassword)) {
      toast.error("Password must be at least 8 characters long, with at least 1 number and 1 special character.");
      return;
    }

    setLoading(true);

    try {
      const requestData = { newPassword, token };
      console.log("Data being submitted:", requestData);
    
      const response = await axios.post("/api/reset-password", requestData);
      console.log(response);
    
      // Check the response status and show success message
      if (response.status === 200) {
        toast.success(response.data.message || "Password reset successfully!");
        setTimeout(() => router.push("/login"), 3000); // Redirect to login after 3 seconds
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      // Improved error handling
      toast.error(error);
      if (error.response) {
        toast.error(error.response?.data?.message || "An error occurred during the password reset process.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };    
  return (
    <div className="password-reset-container">
      <h2>Reset Your Password</h2>
      <ToastContainer />
      <form onSubmit={handlePasswordReset}>
        <div>
          
          <LabelInput
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            
            labelText={""} 
            htmlFor={"newpassword"}          />
        </div>
        <div>
          {loading ? (
            <button type="submit" disabled>
              Resetting...
            </button>
          ) : (
            <button type="submit">Reset Password</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
