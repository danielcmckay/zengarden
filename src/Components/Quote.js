import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import { db } from "../firebase";
import Share from "./Share";

import "./Quote.css";

const Quote = (quoteProps) => {
  const [state, setState] = useState({
    quote: "",
    name: "",
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
    setTimeout(() => {
      var docRef = db.collection("quotes");
      docRef.get().then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const rand = Math.floor(Math.random() * data.length);
        setState({
          ...state,
          quote: data[rand].quote,
          name: data[rand].name,
        });
        setShow(true);
      }, 10000);
    });
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
