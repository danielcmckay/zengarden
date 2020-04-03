import React, { Component } from "react";
import Quote from "./Quote";

import "./QuoteContainer.css";

class QuoteContainer extends Component {
  render() {
    return (
      <div className="QuoteContainer">
        <Quote quote={this.props.quote} name={this.props.name} load={this.props.click} favorite={this.props.favorite}/>
      </div>
    );
  }
}

export default QuoteContainer;
