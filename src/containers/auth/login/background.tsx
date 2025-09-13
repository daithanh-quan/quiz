import React from "react";

// This component provides the animated background and can be used on any page in your Next.js app.
const AnimatedBackground = () => {
  return (
    <>
      {/* This style block contains all the custom CSS for the animations and background gradient.
        The classes for layout are handled directly by Tailwind.
      */}
      <style>{`
        .animated-bg {
          background: linear-gradient(to bottom right, #5a4fcf, #2d26a3, #1e1982);
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .animated-bg::before,
        .animated-bg::after {
          content: '';
          position: absolute;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }

        .animated-bg::before {
          width: 300px;
          height: 300px;
          top: -50px;
          left: -50px;
          animation: float 20s infinite linear;
        }

        .animated-bg::after {
          width: 200px;
          height: 200px;
          bottom: -30px;
          right: -30px;
          animation: float 15s infinite linear reverse;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }

        .float-shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
          animation: float-shape 20s infinite ease-in-out;
          will-change: transform, opacity;
        }
        
        @keyframes float-shape {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20vh) rotate(180deg);
            opacity: 0.5;
          }
        }

        .float-shape:nth-child(1) {
          top: 20%;
          left: 10%;
          width: 80px;
          height: 80px;
          animation-delay: 2s;
        }
        .float-shape:nth-child(2) {
          bottom: 15%;
          right: 5%;
          width: 120px;
          height: 120px;
          animation-delay: 4s;
        }
        .float-shape:nth-child(3) {
          top: 5%;
          right: 25%;
          width: 60px;
          height: 60px;
          animation-delay: 6s;
        }
        .float-shape:nth-child(4) {
          bottom: 30%;
          left: 20%;
          width: 90px;
          height: 90px;
          animation-delay: 8s;
        }
        .float-shape:nth-child(5) {
          top: 50%;
          left: 50%;
          width: 70px;
          height: 70px;
          animation-delay: 10s;
        }
      `}</style>

      <div className="animated-bg absolute inset-0 -z-10">
        <div className="float-shape"></div>
        <div className="float-shape"></div>
        <div className="float-shape"></div>
        <div className="float-shape"></div>
        <div className="float-shape"></div>
      </div>
    </>
  );
};

export default AnimatedBackground;
