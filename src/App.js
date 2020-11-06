import logo from "./logo.svg";
import "./App.css";
import * as _ from "lodash";
import React, { useState } from "react";

function card(name, solvedCards, activeCards) {
  if (solvedCards.includes(name)) {
    return <img src="/images/back_overlay.png"></img>;
  } else if (activeCards.includes(name)) {
    return <img src={"/images/" + name[0] + "_of_" + name[1] + ".svg"}></img>;
  } else {
    return <img src={"/images/back.png"}></img>;
  }
}

function App() {
  let cardNumbers = _.range(1, 14);
  let deck = cardNumbers
    .concat(cardNumbers)
    .concat(cardNumbers)
    .concat(cardNumbers);
  let suites = ["clubs", "diamonds", "hearts", "spades"];
  let cards = deck.map((element, index) => {
    console.log([element, suites[index % suites.length]]);
    return [element, suites[index % suites.length]];
  });

  let [solvedCards, setSolvedCards] = useState([]);
  let [activeCards, setActiveCards] = useState([]);

  return (
    <div className="App">
      {cards.map((element, index) => {
        return card(element, solvedCards, activeCards);
      })}
    </div>
  );
}

export default App;
