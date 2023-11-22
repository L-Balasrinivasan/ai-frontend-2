import React, { useState } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import eyeLogo from "../../assets/Eye.svg";
import errorlogo from "../../assets/error.svg";
import "./dashboard.css";
import Footer from "../../components/footer/Footer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import config from "../../config/config";

function Dashboard() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleApiKeySubmit = async () => {
    try {
      console.log("form submitted");
      const formData = new FormData();
      formData.append("api_key", apiKey);

      const response = await fetch(`${config.apiUrl}/ai/authenticate_API`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("API Key is valid. Redirecting to the next page...");
        navigate("/qaurl");
      } else {
        const errorData = await response.json();
        console.log(errorData, "error");
        setError("API Key is invalid");
      }
    } catch (error) {
      setError("API Key is invalid");
    }
  };

  return (
    <div className="all_head_container">
      <Header activePage={activePage} />
      <div className="container_body">
        <div className="body_part1">
          <div className="open_api">Open AI API Key</div>
          <div className="auth_api">Authenticate user based on API Key</div>
        </div>
        <div className="body_part2">
          <div className="input_head">Open AI API Key</div>
          <div style={{ position: "relative" }}>
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter API Key"
              className="input_box"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            {visible ? (
              <AiOutlineEye
                style={{
                  position: "absolute",
                  top: "60%",
                  right: "20px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <AiOutlineEyeInvisible
                style={{
                  position: "absolute",
                  top: "60%",
                  right: "20px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setVisible(!visible)}
              />
            )}
          </div>
          <button className="submit_button" onClick={handleApiKeySubmit}>
            Submit
          </button>
        </div>
        {error && (
          <div className="error-message">
            <img src={errorlogo} alt={"errorlogo"} />
            {error}
          </div>
        )}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
