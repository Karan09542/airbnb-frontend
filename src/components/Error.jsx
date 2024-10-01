import React from "react";
import { Link } from "react-router-dom";
import ramnaamsatyahain from "../assets/ramnaamsatyahain.jpg";

function ErrorPage() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        backgroundImage:
          "url('https://e1.pxfuel.com/desktop-wallpaper/450/964/desktop-wallpaper-sita-ram-ram.jpg')", // Replace with a Hinduism-inspired image
        backgroundAttachment: "fixed",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "32px",
          border: "4px solid #e65100", // Saffron border
          borderRadius: "12px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#b71c1c",
            marginBottom: "16px",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "2rem",
            fontFamily: "'Noto Serif', serif", // Traditional serif font
            color: "#ffb300", // Saffron color
            marginBottom: "16px",
          }}
        >
          सीताराम सीताराम
        </p>
        <p
          style={{
            fontSize: "1.5rem",
            color: "#b71c1c",
            marginBottom: "24px",
          }}
        >
          पृष्ठ नहीं मिला
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#c62828",
            color: "white",
            fontSize: "1.125rem",
            fontWeight: "600",
            borderRadius: "9999px",
            textDecoration: "none",
          }}
        >
          मुख्य पेज पर वापस जाएं
        </Link>
      </div>
    </div>
  );
}

const NotFoundPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${ramnaamsatyahain})`, // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    color: "#fff",
    fontFamily: "'Noto Serif', serif",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  const overlayStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    zIndex: "1",
    color: "#ffdd57",
  };

  const headingStyle = {
    fontSize: "3rem",
    margin: "0.5rem",
    fontWeight: "bold",
  };

  const messageStyle = {
    fontSize: "1.5rem",
    margin: "1rem",
  };

  const designElementStyle = {
    fontSize: "6rem",
    margin: "1rem",
  };

  const buttonStyle = {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#ff5c00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <div style={contentStyle}>
          <div style={designElementStyle}>🕉️</div>
          <h1 style={headingStyle}>राम नाम सत्य हैं</h1>
          <p style={messageStyle}>
            The page you are looking for does not exist.
          </p>
          <button style={buttonStyle}>
            <Link to="/">Return to Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export { ErrorPage, NotFoundPage };
