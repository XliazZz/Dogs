import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacebookLogin = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:3001";
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (response) => {
    if (response) {
      const { email } = response.data;
      if (email) {
        try {
          const { data } = await axios.post(`${URL}/login/facebook`, { email });
          if (data && data.token) {
            localStorage.setItem("token", data.token);
            setError(null);
            setSuccess(true);
          }
        } catch (error) {
          setError(error.response);
          setSuccess(false);
        }
      }
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/home");
    }
  }, [success]);

  return (
    <LoginSocialFacebook
      appId="6907105542635926"
      onResolve={(response) => {
        handleLogin(response);
      }}
      onReject={(error) => {
        console.log(error);
      }}
    >
      <FacebookLoginButton  />
    </LoginSocialFacebook>
  );
};

export default FacebookLogin;
