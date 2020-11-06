import logo from "./logo.svg";
import "./App.css";
import * as _ from "lodash";

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

  return (
    <div className="App">
      {cards.map((element, index) => {
        return <p>{element}</p>;
      })}
    </div>
  );
}

export default App;
