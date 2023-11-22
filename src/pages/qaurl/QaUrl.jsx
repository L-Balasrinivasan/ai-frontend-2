import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Accordion } from "react-bootstrap";
import BarGraph from "../../components/barGraph/Bargraph";
import "./qaurl.css";
import Footer from "../../components/footer/Footer";
import HowItWorks from "../../components/howitworks/HowItWorks";
import config from "../../config/config";

function QaUrl() {
  const [selectedOption, setSelectedOption] = useState("Text");
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [summarizeChecked, setSummarizeChecked] = useState(false);
  const [sentimentChecked, setSentimentChecked] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [qaresponse, setQAResponse] = useState("");
  const [error, setError] = useState(null);
  const [showAsktButton, setShowAskButton] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [loading, setLoading] = useState("");
  const [qaLoad, setQaLoad] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");

  const clearForm = () => {
    setInputValue("");
    setResponse("");
    setQAResponse("");
    setError(null);
    setUserQuestion("");
    setShowSubmitButton(false);
    setShowAccordion(false);
    setSummarizeChecked(false);
    setSentimentChecked(false);
    setShowAskButton(false);
  };

  const handleSubmitClick = async () => {
    if (userQuestion.trim() === "") {
      return;
    }
    try {
      setQaLoad(true);
      const formData = new FormData();
      formData.append("question", userQuestion);
      const apiResponse = await fetch(`${config.apiUrl}/ai/process_qa`, {
        method: "POST",
        body: formData,
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        if (data.knowledge_base) {
          setQAResponse(data.answer);
        } else {
          setQAResponse("Sorry, the knowledge base is not available.");
        }
      } else {
        console.error("API response not OK");
        setError("An error occurred while processing your request.");
      }
      setQaLoad(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred while processing your request.");
      setQaLoad(false);
    }
    setShowAskButton(false);
  };

  const handleOptionChange = (value) => {
    clearForm();
    setInputValue("");
    setSelectedOption(value);
  };

  const handleSummarizeChange = () => {
    setSummarizeChecked(!summarizeChecked);
  };

  const handleSentimentChange = () => {
    setSentimentChecked(!sentimentChecked);
  };

  const handleAccordionClick = async () => {
    const formData = new FormData();
    if (selectedOption === "URL") {
      formData.append("url", inputValue);
    } else if (selectedOption === "Text") {
      formData.append("text", inputValue);
    }
    formData.append("summarize", summarizeChecked);
    formData.append("sentiment_analysis", sentimentChecked);
    const formDataArray = Array.from(formData);
    console.log("After appending images:", formDataArray);
    try {
      setLoading(true);
      const response = await fetch(
        selectedOption === "URL"
          ? `${config.apiUrl}/ai/process_url`
          : `${config.apiUrl}/ai/process_text`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data, "data");
        setResponse(data);
        setShowAccordion(!showAccordion);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setError(errorData.exception);
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <div className="all_head_container">
      <Header activePage={activePage} />
      <div className="body_container">
        <div className="toggle_container">
          <div
            style={{
              marginTop: "2rem",
              background: "#F0F5FA",
              padding: "10px",
              borderRadius: "9px",
            }}
          >
            <ToggleButtonGroup
              type="radio"
              name="options"
              value={selectedOption}
              onChange={(value, e) => handleOptionChange(value, e)}
            >
              <ToggleButton
                id="toggle-url"
                value="Text"
                className={`toggle-button ${
                  selectedOption === "Text" ? "selected" : ""
                }`}
              >
                Text
              </ToggleButton>
              <ToggleButton
                id="toggle-link"
                value="URL"
                className={`toggle-button ${
                  selectedOption === "URL" ? "selected" : ""
                }`}
              >
                URL
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{ width: "100%", marginTop: "30px", height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="text_lable">
                {selectedOption === "Text"
                  ? " Enter the text"
                  : "Enter your URL"}
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Ask here"
                  style={{
                    flex: 2,
                    height: "3rem",
                    borderRadius: "4px",
                    border: "1px solid #E3E3E3",
                    background: "#FAFAFA",
                    padding: "10px",
                    outline: "none",
                  }}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowSubmitButton(true);
                  }}
                />
                {showSubmitButton && (
                  <button
                    className="submit_text"
                    onClick={handleAccordionClick}
                    disabled={loading}
                  >
                    {loading ? "Loading.." : "Submit"}
                  </button>
                )}
              </div>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                }}
              >
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={summarizeChecked}
                      onChange={handleSummarizeChange}
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    />
                    <span
                      style={{
                        marginLeft: "10px",
                        color: "#4F4F4F",
                        fontFamily: "Poppins",
                        fontSize: " 14px",
                      }}
                    >
                      Summarize it
                    </span>
                  </label>
                </div>
                <div>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={sentimentChecked}
                      onChange={handleSentimentChange}
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    />
                    <span
                      style={{
                        marginLeft: "10px",
                        color: "#4F4F4F",
                        fontFamily: "Poppins",
                        fontSize: " 14px",
                      }}
                    >
                      Sentiment
                    </span>
                  </label>
                </div>
              </div>
              {showAccordion && (
                <div style={{ width: "86%" }}>
                  {summarizeChecked && (
                    <Accordion className="mt-5">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <p className="accordian_head mt-3">Summary</p>
                        </Accordion.Header>
                        <Accordion.Body className="accordian_body">
                          {response.summarized_response}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
                  {sentimentChecked && (
                    <Accordion className="mt-2">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <p className="accordian_head mt-3">
                            Sentiment response
                          </p>
                        </Accordion.Header>
                        <Accordion.Body>
                          <BarGraph
                            sentimentData={response.sentiment_of_summary}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
                  <div style={{ marginTop: "20px" }}>
                    <p
                      style={{
                        color: "#4F4F4F",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                        letterSpacing: "0.25px",
                        flex: 1,
                      }}
                    >
                      Ask your question
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "30px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Ask here"
                        value={userQuestion}
                        onChange={(e) => {
                          setUserQuestion(e.target.value);
                          setShowAskButton(true);
                        }}
                        style={{
                          flex: 2,
                          height: "3rem",
                          borderRadius: "4px",
                          border: "1px solid #E3E3E3",
                          background: "#FAFAFA",
                          padding: "10px",
                          outline: "none",
                        }}
                      />
                      {showAsktButton && (
                        <button
                          className="submit_text"
                          onClick={handleSubmitClick}
                          disabled={qaLoad}
                        >
                          {qaLoad ? "Loading.." : "Submit"}
                        </button>
                      )}
                    </div>
                    <div style={{ margin: "30px 0px" }}>
                      {qaresponse && <div>{qaresponse}</div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <HowItWorks selectedParagraph="EMAAS" />
      <Footer />
    </div>
  );
}

export default QaUrl;
