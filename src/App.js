import logo from "./logo.svg";
import "./App.css";
import * as _ from "lodash";
import React, { useState } from "react";

function card(name, solvedCards, activeCard, setActiveCard) {
  let onclick = () => setActiveCard(name);
  if (solvedCards.includes(name)) {
    return <img onClick={onclick} src="/images/back_overlay.png"></img>;
  } else if (activeCard.length > 1 && 0 == _.difference(activeCard, name)) {
    return (
      <img
        onClick={onclick}
        src={"/images/" + name[0] + "_of_" + name[1] + ".svg"}
      ></img>
    );
  } else {
    return <img onClick={onclick} src={"/images/back.png"}></img>;
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
    return [element, suites[index % suites.length]];
  });

  let [solvedCards, setSolvedCards] = useState([]);
  let [activeCard, setActiveCard] = useState([]);

  console.log(activeCard);

  return (
    <div className="App">
      {cards.map((element, index) => {
        return card(element, solvedCards, activeCard, setActiveCard);
      })}
    </div>
  );
}

export default App;
