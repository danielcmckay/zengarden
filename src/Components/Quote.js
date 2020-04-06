import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import Share from "./Share";

import "./Quote.css";

const Quote = (quoteProps) => {
  const [state, setState] = useState({
    quote: "",
    name: "",
    id: ""
  });

  const [show, setShow] = useState(true);
  const transitions = useTransition(show, null, {
    from: { position: "fixed", top: "120px", right: "10%", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  const getQuoteHandler = () => {
    setShow(false);
    setTimeout(async () => {
      const response = await fetch("http://localhost:5000/api/quotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      const rand = Math.floor(Math.random() * json.body.length);
      setState({
        ...state,
        quote: json.body[rand].quote,
        name: json.body[rand].name,
        id: json.body[rand].id
      });
      setShow(true);
    }, 1000);
  };

  useEffect(() => {
    getQuoteHandler();
  }, []);

  const quote = (
    <div
      style={
        show
          ? { opacity: 1, transition: "all ease-in 1s" }
          : { opacity: 0, transition: "all ease-out 1s" }
      }
    >
      <p className="MainQuote">{state.quote}</p>
      <span className="ByQuote">{state.name} </span>{" "}
    </div>
  );

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className="Quote" key={key} style={props}>
              {quote}
              <br />
              <Share name={state.name} quote={state.quote} />
            </animated.div>
          )
      )}
      <span>
        <button className="QuoteBtn" onClick={getQuoteHandler}>
          Get a new quote
        </button>
        <button
          className="FavoritesBtn"
          onClick={() => quoteProps.favorite(state)}
        >
          <i className="fa fa-heart"></i>
        </button>
      </span>
    </>
  );
};

export default Quote;
