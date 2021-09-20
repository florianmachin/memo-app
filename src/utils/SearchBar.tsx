import React from "react";

type Props = {
  keyword: any;
  setKeyword: any;
};
const SearchBar = ({ keyword, setKeyword }: Props) => {
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
    borderRadius: "5px",
  };
  return (
    <input
      style={BarStyling}
      key="random1"
      value={keyword}
      placeholder={"Rechercher une note"}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
