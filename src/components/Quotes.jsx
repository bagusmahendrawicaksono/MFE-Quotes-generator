import React from "react";
import MockData from "../MockData";

export default function Quotes() {
  const [quote, setQuote] = React.useState({
    imageUrl: "https://picsum.photos/id/117/1544/1024",
    quoteText: "",
  });
  function handleClick() {
    const imageArray = MockData.data.Images;
    const randomNo = Math.floor(Math.random() * imageArray.length);
    const url = imageArray[randomNo].download_url;
    setQuote((prevQuote) => ({
      ...prevQuote,
      imageUrl: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setQuote((prevQuote) => ({
      ...prevQuote,
      [name]: value,
    }));
  }
  return (
    <div className="main">
      <div className="form">
        <input
          type={"text"}
          placeholder="Quotes"
          className="form--input"
          name="quoteText"
          value={quote.quoteText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={handleClick}>
          Get a new Quote Image
        </button>
        <img src={quote.imageUrl} className="quotes--image" />
        <h2 className="quotes--text">{quote.quoteText}</h2>
      </div>
    </div>
  );
}
