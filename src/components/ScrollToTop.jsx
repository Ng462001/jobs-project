import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const [isScrollUp, setIsScrollUp] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrollUp(true);
      } else {
        setIsScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isScrollUp && (
        <button onClick={handleScrollToTop} style={buttonStyle}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

const buttonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 15px",
  backgroundColor: "rgb(96, 96, 233)",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ScrollToTop;

