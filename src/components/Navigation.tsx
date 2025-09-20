import React from "react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

function Navigation({ currentPage, onPageChange }: NavigationProps): JSX.Element {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <button
        onClick={() => onPageChange("home")}
        style={{ margin: "5px", padding: "8px 15px", cursor: "pointer" }}
      >
        Home
      </button>
      <button
        onClick={() => onPageChange("about")}
        style={{ margin: "5px", padding: "8px 15px", cursor: "pointer" }}
      >
        About
      </button>
      <button
        onClick={() => onPageChange("contact")}
        style={{ margin: "5px", padding: "8px 15px", cursor: "pointer" }}
      >
        Contact
      </button>
    </nav>
  );
}

export default Navigation;
