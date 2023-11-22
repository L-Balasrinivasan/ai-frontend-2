import React from "react";
import './footer.css';

function Footer() {
  return (
    <div
    className="footer"
      style={{
        width:"100%",
        marginTop:"10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-color-gray-1, #616160)",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "10px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
      }}
    >
      <p>Enterprise Minds © 2023 - 2024, All Right Reserved</p>
    </div>
  );
}

export default Footer;
