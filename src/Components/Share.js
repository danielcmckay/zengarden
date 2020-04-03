import React from "react";
import { FacebookShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Share.css";

const Share = (props) => {
  const copyClickHandler = (e) => {
    e.stopPropagation();
    e.target.className = "far fa-copy Copied";
  }

  return (
    <span>
      <FacebookShareButton url="https://www.google.com" quote={props.quote}>
        <i className="fab fa-facebook"></i>
      </FacebookShareButton>{" "}
      <CopyToClipboard text={`${props.quote} – ${props.name}`}>
        <i className="far fa-copy NotCopied" onClick={copyClickHandler}></i>
      </CopyToClipboard>
    </span>
  );
};

export default Share;
