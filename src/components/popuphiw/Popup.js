import React from "react";

function Popup() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "85%",
          gap: "20px",
        }}
      >
        <div style={{ flex: 4 }}>
          <div className="number_div">1</div>
          <p className="body_heading mt-2" style={{}}>
            Upload Images
          </p>
          <p className="body_content">
            Begin by uploading two images of your chore
          </p>
        </div>
        <div style={{ flex: 4 }}>
          <div className="number_div">2</div>
          <p className="body_heading mt-2" style={{}}>
            Adjust Similarity Threshold
          </p>
          <p className="body_content">
            Use the slider to set your desired similarity threshold
          </p>
        </div>
        <div style={{ flex: 4 }}>
          <div className="number_div">3</div>
          <p className="body_heading mt-2" style={{}}>
            View Results
          </p>
          <p className="body_content">
            Instantly see the seniority score and a description of whether the
            images are similar or not
          </p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
