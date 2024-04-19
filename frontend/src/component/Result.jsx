
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Result = ({ inputValue }) => {
  const [shortLink, setShortLink] = useState("");
  const [longLink, setLongLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
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
      console.log(data);

      setShortLink(data.shortUrl);
      setLongLink(data.longUrl);
      setUrlLink(data.urlCode);

    } catch (error) {
      console.log(error);
      setError(error);

    } finally {
      setLoading(false);
    }
  };

  const directLink = async () => {
    try {
      const res = await fetch(`http://localhost:5000/${urlLink}`)
      const data = await res.json();

      setRedirectLink(data);
      console.log(redirectLink);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
      directLink();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);


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
          <a href={longLink} target="_blank">{shortLink}</a>
          {/*<a>{shortLink}</a>*/}

          <CopyToClipboard text={redirectLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>Copy</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default Result;
