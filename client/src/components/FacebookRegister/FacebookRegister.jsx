import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacebookRegister = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:3001";
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (response) => {
    if (response) {
      const { email, name } = response.data;
      if (email && name) {
        try {
          const response = await axios.post(`${URL}/register/facebook`, {
            email,
            name,
          });
          console.log("Data send success:", response.data);

          try {
            const { data } = await axios.post(`${URL}/login/facebook`, { email });
            if (data && data.token) {
              localStorage.setItem("token", data.token);
              setError(null);
              setSuccess(true);
            }
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          setError(error.response);
          setSuccess(false);
        };
      };
    };
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
        console.log(response);
        handleRegister(response); 
      }}
      onReject={(error) => {
        console.log(error);
      }}
    >
      <FacebookLoginButton text="Register in with Facebook" />
    </LoginSocialFacebook>
  );
};

export default FacebookRegister;
