import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import "./geoLocation.css";
import axios from "axios";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import imageloc from "../../assets/location.svg";
import config from "../../config/config";
const apiKey = "AIzaSyC1So339ietfi88HU0uQ6D6ml6QRnGsMa0";

function GeoLocation() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showTechConcepts, setShowTechConcepts] = useState(false);
  const [activePage, setActivePage] = useState("GeoLocationTagger");
  const [inputSentence, setInputSentence] = useState("");
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const targetHowItWorks = useRef(null);
  const targetTechConcepts = useRef(null);
  const isMapVisible = locations.length > 0 && inputSentence.trim() !== "";

  const containerStyle = {
    width: "75vw",
    height: isMapVisible ? "116vh" : "91vh",  };

  const options = {
    // minZoom: 3,
    streetViewControl: false,
    zoomControl: true,
    mapTypeControl: false,
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/ai/identify-locations/`,
        {
          sentence: inputSentence,
        }
      );
      if (response.data) {
        const locationsArray = Object.entries(response.data).map(
          ([name, details]) => ({
            name,
            ...details,
          })
        );
        const lats = locationsArray.map((location) => location.lat);
        const lons = locationsArray.map((location) => location.lon);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);
        const newCenter = {
          lat: (minLat + maxLat) / 2,
          lng: (minLon + maxLon) / 2,
        };
        setCenter(newCenter);
        setLocations(locationsArray);
        console.log(response.data, "data");
        console.log(locationsArray, "location");
      } else {
        console.log("Error while getting response");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };


  return (
    <div className="all_head_container">
      <Header activePage={activePage} />
      <div className="container-body">
        <div className="head-body">
          <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <div className="head-ner">
              NER - based Location Extractor & Geolocator
            </div>
            <div className="body-clear">
              Enter a sentence containing locations:
              <button
                className="clear-all-button"
                onClick={() => {
                  setInputSentence("");
                  setLocations([]);
                }}
              >
                Clear all
              </button>
            </div>
            <textarea
              className="input-box-loc"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
            ></textarea>
            <button className="submit_loc" onClick={fetchLocations}>
              Submit
            </button>
            {locations.length > 0 && (
              <div className="location_div">
                <div className="mt-4 mb-2">
                  <img src={imageloc} alt="Logo" className="imageloc" />
                  <span className="location_name"> Location :</span>
                </div>
                <div className="location_output">
                  {locations.map((location, index) => (
                    <div key={index}>{location.name}</div>
                  ))}
                </div>{" "}
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
                        Begin by uploading two images of your chore
                      </p>
                    </div>
                    <div className="header_tooltip">
                      <div className="number_div_tooltip ">2</div>
                      <p className="to-body-head  mb-0">
                        Adjust Similarity Threshold
                      </p>
                      <p className="body_content_tooltip  mb-0">
                        Use the slider to set your desired similarity threshold
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
                  </div>
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
                      Enterprise Minds Geo Tagger (EMGeo):
                    </p>
                    <p className="body_content_tooltip  mb-0">
                      EMGeo is a sophisticated tool engineered to pinpoint and
                      identify locations within textual content. Utilizing
                      advanced techniques such as Named Entity Recognition and
                      Context-Aware Parsing, it meticulously scans through
                      sentences to extract geographical entities, be it cities,
                      countries, or landmarks. Technical elements such as
                      tokenization and dependency parsing further refine the
                      extraction process, ensuring utmost precision. From a
                      business standpoint, the utility of EMGeo is vast. It can
                      revolutionize content analysis by providing geo-contextual
                      insights, enhance user experience in travel platforms by
                      delivering location-specific recommendations, and assist
                      in data analytics by adding a spatial dimension to textual
                      data. In essence, EMGeo bridges the gap between text and
                      geography, paving the way for enriched data interpretation
                      and user interactions
                    </p>
                  </div>
                </Tooltip>
              )}
            </Overlay>
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
                {locations.map((location, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: location.lat,
                      lng: location.lon,
                    }}
                    label={location.name}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeoLocation;
