import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HowItWorks from "../../components/howitworks/HowItWorks";
import imagelogo from "../../assets/Frame.svg";
import "./imageSimilarity.css";
import Form from "react-bootstrap/Form";
import config from "../../config/config";
function ImageSimilarity() {
  const [activePage, setActivePage] = useState("ImageSimilarity");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [file1, setfile1] = useState();
  const [file2, setfile2] = useState();
  const [threshold, setThreshold] = useState(0);
  const [similarityResult, setSimilarityResult] = useState(null);

  const handleImageChange = (e, imageIndex) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        if (file.size <= 200 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = () => {
            if (imageIndex === 1) {
              setSelectedImage1(reader.result);
              setfile1(file);
            } else if (imageIndex === 2) {
              setSelectedImage2(reader.result);
              setfile2(file);
            }
          };
          reader.readAsDataURL(file);
        } else {
          alert("File size exceeds the 200MB limit.");
        }
      } else {
        alert("Please select a JPEG, PNG, or JPG file.");
      }
    } else {
      if (imageIndex === 1) {
        setSelectedImage1(null);
      } else if (imageIndex === 2) {
        setSelectedImage2(null);
      }
    }
  };
  const handleThresholdChange = (e) => {
    console.log("New Threshold Value:", e.target.value);
    setThreshold(parseFloat(e.target.value));
  };

  useEffect(() => {
    console.log("similarityResult", similarityResult);
  }, [similarityResult]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("API URL:", config.apiUrl);

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("threshold", threshold);

    try {
      const response = await fetch(`${config.apiUrl}/ai/check-similarity/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, "data");
        const similarString = data.similar;
        console.log(similarString, "similarstring");
        const isSimilar = similarString.toLowerCase().includes("true");
        console.log("isSimilar", isSimilar);
        setSimilarityResult({ ...data, similar: isSimilar });
        console.log("similarityResult", similarityResult);
      } else {
        console.error("Invalid similarity response");
      }
    } catch (error) {
      console.error("Error checking similarity in image:", error);
    }
  };

  return (
    <div className="all_head_container">
      <Header activePage={activePage} />
      <div className="body_container">
        <div className="body_part1">
          <div className="btopic">Image similarity checker using clip</div>
          <div className="bsubtopic">
            Upload two images. Drag & drop or click here to upload.
          </div>
        </div>
        <div className="image-upload-container">
          <div className="image-upload-box">
            <label htmlFor="fileInput1" className="image-input-label">
              {selectedImage1 ? (
                <div className="image-container">
                  <img
                    src={selectedImage1}
                    alt="Selected"
                    className="image-preview"
                  />
                </div>
              ) : (
                <div className="upload-container">
                  <img src={imagelogo} alt="Logo" className="imagelogo" />
                  <div className="upload-text">
                    <p className="m-0">
                      <span className="blue-text">Click here</span>
                      <span> to upload or drag & drop</span>
                    </p>
                    <p className="limit_text m-0">
                      Limit 200MB per file JPEG, PNG, JPG
                    </p>
                  </div>
                </div>
              )}
            </label>
            <input
              type="file"
              id="fileInput1"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleImageChange(e, 1)}
              style={{ display: "none" }}
            />
          </div>

          <div className={`image-upload-box `}>
            <label htmlFor="fileInput2" className="image-input-label">
              {selectedImage2 ? (
                <div className="image-container">
                  <img
                    src={selectedImage2}
                    alt="Selected"
                    className="image-preview"
                  />
                </div>
              ) : (
                <div className="upload-container">
                  <img src={imagelogo} alt="Logo" className="imagelogo" />
                  <div className="upload-text">
                    <p className="m-0">
                      <span className="blue-text">Click here</span>
                      <span> to upload or drag & drop</span>
                    </p>
                    <p className="limit_text m-0">
                      Limit 200MB per file JPEG, PNG, JPG
                    </p>
                  </div>
                </div>
              )}
            </label>
            <input
              type="file"
              id="fileInput2"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleImageChange(e, 2)}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "75%",
            flexDirection: "row",
            gap: "1rem",
            padding: "20px 2px",
            position: "relative",
          }}
        >
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              width: "45%",
              position: "relative",
            }}
          >
            <label className="label-range">select similarity threshold</label>
            <Form.Range
              className="form-range"
              value={threshold}
              max={1}
              step={0.01}
              onChange={handleThresholdChange}
            />
            <div className="range-label-min">0.00</div>
            <div className="range-label-max">1.00</div>

            {threshold !== 0 && (
              <div
                className="range-overlay"
                style={{
                  left: `calc(${threshold * 100}% - 4px)`,
                }}
              >
                {threshold.toFixed(2)}
              </div>
            )}
          </div>

          {similarityResult && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "space-between",
              }}
            >
              <p className="similarity_score">
                Similarity Score: {similarityResult.similarity_score}
              </p>
            </div>
          )}
        </div>
        {similarityResult && (
          <div
            className={`similaritycheck ${
              similarityResult.similar
                ? "similar-background"
                : "not-similar-background"
            }`}
          >
            <p className="mb-0 p-2">
              {similarityResult.similar
                ? "The images are similar based on the selected threshold"
                : "The images are not similar based on the selected threshold"}
            </p>
          </div>
        )}
        <div>
          <button className="submit_CS" onClick={handleSubmit}>
            Check Similarity
          </button>
        </div>
      </div>
      <HowItWorks selectedParagraph="EMSIM" />
      <Footer />
    </div>
  );
}

export default ImageSimilarity;
