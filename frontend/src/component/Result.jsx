import axios from "axios";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Result = ({ inputValue }) => {
  const [shortLink, setShortLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl: inputValue,
        }),
      });

      const data = await res.json();
      setShortLink(data.shortUrl);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  //console.log(shortLink);

  if(loading){
    return <p className="noData">Loading...</p>
  }
  if(error){
    return <p className="noData">Something went wrong </p>
  }

  return (
    <>
      {shortLink && (
        <div className="result">
          <p>{shortLink}</p>

          <CopyToClipboard text={shortLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>Copy</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default Result;
