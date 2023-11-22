import React, { useState, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import imagelogo from "../../assets/Frame.svg";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import imageloc from "../../assets/location.svg";
import "./autoLocation.css";
import axios from "axios";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import config from "../../config/config";

const apiKey = "AIzaSyC1So339ietfi88HU0uQ6D6ml6QRnGsMa0";

function AutoLocation() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showTechConcepts, setShowTechConcepts] = useState(false);
  const [activePage, setActivePage] = useState("AutoLocationRecognizer");
  const [selectedImage, setSelectedImage] = useState(null);
  const [locations, setLocations] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [file, setFile] = useState("");
  const targetHowItWorks = useRef(null);
  const targetTechConcepts = useRef(null);

  const containerStyle = {
    width: "75vw",
    height: locations ? "116vh" : "91vh",
  };
  const center = { lat: 37.7749, lng: -122.4194 };

  const options = {
    // minZoom: 3,
    streetViewControl: false,
    zoomControl: true,
    mapTypeControl: false,
  };

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
            setSelectedImage(reader.result);
            setFile(file);
          };
          reader.readAsDataURL(file);
        }
      } else {
        alert("File size exceeds the 200MB limit.");
      }
    } else {
      alert("Please select a JPEG, PNG, or JPG file.");
    }
  };

  const analyzeImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    console.log("file", file);
    try {
      const response = await axios.post(
        `${config.apiUrl}/ai/predict/`,
        formData
      );
      const data = response.data;
      console.log(data, "response");
      setLocations(data);
      console.log(locations, "locations");
      console.log(data.class, "data");
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  };

  return (
    <div className="all_head_container">
      <Header activePage={activePage} />
      <div className="container-body">
        <div className="head-body">
          <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <div className="head-ner">Inference </div>
            <div className="body-clear mb-2 ">
              Upload two image. Drag & drop or click here to upload{" "}
            </div>
            <div
              className={`image-upload-box-loc ${
                selectedImage ? "uploaded" : ""
              }`}
            >
              <label htmlFor="fileInput1" className="image-input-label">
                {selectedImage ? (
                  <div className="image-container_loc">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="image-preview-aloc"
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
            <button className="submit_loc" onClick={analyzeImage}>
              Submit
            </button>
            {locations && (
              <div className="location_div">
                <div className="mt-4 mb-2">
                  <img src={imageloc} alt="Logo" className="imageloc" />
                  <span className="location_name"> Location :</span>
                </div>
                <div className="location_output"> {locations.class}</div>
              </div>
            )}
          </div>

          <div
            style={{
              width: "100%",
              marginTop: "4rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              className="how_submit mb-1"
              ref={targetHowItWorks}
              onClick={() => setShowHowItWorks(!showHowItWorks)}
            >
              How it works
            </button>
            <Overlay
              target={targetHowItWorks.current}
              show={showHowItWorks}
              style={{ background: "#FFFFFF" }}
              placement="right"
            >
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: "100%",
                      height: "100%",
                      gap: "20px",
                    }}
                  >
                    <div className="header_tooltip">
                      <div className="number_div_tooltip ">1</div>
                      <p className="to-body-head mb-0">Upload Images</p>
                      <p className="body_content_tooltip mb-0">
                        Begin by uploading two images of your chore{" "}
                      </p>
                    </div>
                    <div className="header_tooltip">
                      <div className="number_div_tooltip ">2</div>
                      <p className="to-body-head  mb-0">
                        Adjust Similarity Threshold
                      </p>
                      <p className="body_content_tooltip  mb-0">
                        {" "}
                        Use the slider to set your desired similarity threshold{" "}
                      </p>
                    </div>
                    <div className="header_tooltip">
                      <div className="number_div_tooltip ">3</div>
                      <p className="to-body-head  mb-0">View Results</p>
                      <p className="body_content_tooltip  mb-0">
                        Instantly see the seniority score and a description of
                        whether the images are similar or not
                      </p>
                    </div>
                  </div>{" "}
                </Tooltip>
              )}
            </Overlay>
            <button
              className="how_submit mb-1"
              ref={targetTechConcepts}
              onClick={() => setShowTechConcepts(!showTechConcepts)}
            >
              Tech Concepts
            </button>
            <Overlay
              target={targetTechConcepts.current}
              show={showTechConcepts}
              style={{ background: "#FFFFFF" }}
              placement="right"
            >
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <p className="to-body-head  mb-0">
                      Enterprise Minds Auto Location Identifier (EMALI):
                    </p>
                    <p className="body_content_tooltip  mb-0">
                      EMALI is like a global tour guide living inside your
                      computer (or your hand, if using on a smartphone). This
                      AI-powered wiz uses a pre-existing model, trained on a
                      vast array of data, to identify and categorize locations
                      in images. It’s like having a seasoned traveler at your
                      fingertips but without the need to train it from scratch.
                      This system is as adaptable as it is smart and capable of
                      dealing with a multitude of images and location
                      categories. It’s like having a personal cartographer who
                      ensures precise location recognition using advanced
                      techniques like nearest neighbor search. The potential
                      applications are as diverse as the locations it can
                      recognize. From e- commerce platforms offering
                      location-based product recommendations, to social media
                      platforms enhancing user experience with location tagging.
                      EMALI is an efficient and effective solution for
                      businesses aiming to navigate the world of location
                      recognition AI.
                    </p>
                  </div>{" "}
                </Tooltip>
              )}
            </Overlay>{" "}
            <div className="user_div mb-1"> A User-Friendly Guide</div>
            <Footer />
          </div>
        </div>
        <div className="map-container">
          <div>
            <LoadScript googleMapsApiKey="AIzaSyA5Lt3E5gYb-lfogvaSpCrvCpocLqHwNOI">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                options={options}
              >
                {mapMarkers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={marker.position}
                    label={marker.label}
                  />
                ))}
                {locations && (
                  <Marker
                    position={{
                      lat: locations.lat,
                      lng: locations.lng,
                    }}
                    label={locations.class}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutoLocation;
