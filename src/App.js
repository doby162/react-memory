import logo from "./logo.svg";
import "./App.css";
import * as _ from "lodash";
import React, { useState, useEffect } from "react";

function card(name, solvedCards, activeCards, setActiveCards, tmpCards) {
  let nameSquished = name[0] + name[1];
  let onclick = () => {
    if (
      !solvedCards.includes(nameSquished) &&
      !activeCards.includes(nameSquished)
    )
      setActiveCards((existing) => existing.concat(nameSquished));
  };

  if (solvedCards.includes(nameSquished)) {
    return <img onClick={onclick} src="/images/back_overlay.png"></img>;
  } else if (
    activeCards.includes(nameSquished) ||
    tmpCards.includes(nameSquished)
  ) {
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
  let [activeCards, setActiveCards] = useState([]);
  let [tmpCards, setTmpCards] = useState([]);
  let [attempts, setAttempts] = useState(0);
  useEffect(() => {
    if (activeCards.length == 2) {
      setAttempts((i) => i + 1);
      setTmpCards(activeCards);
      if (parseInt(activeCards[0]) == parseInt(activeCards[1])) {
        setSolvedCards(solvedCards.concat(activeCards));
      }
      setActiveCards([]);
    } else if (activeCards.length == 1) {
      setTmpCards([]);
    }
  }, [activeCards]);

  return (
    <div className="App">
      {solvedCards.length == deck.length ? (
        <p>Victory! {attempts} attempts used.</p>
      ) : (
        <p>{attempts} attempts used so far</p>
      )}
      {cards.map((element, index) => {
        return card(
          element,
          solvedCards,
          activeCards,
          setActiveCards,
          tmpCards
        );
      })}
    </div>
  );
}

export default App;
