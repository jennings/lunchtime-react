import React from "react";
import { useState } from "react";
import { localeCompareWithSelector } from "./util/compare";

export default function DestinationList({ destinations, onCreate, onDelete }) {
  const destinationItems = destinations
    .slice()
    .sort(localeCompareWithSelector(d => d.name))
    .map(d => (
      <li key={d.name}>
        <button onClick={() => onDelete(d)}>delete</button>
        {" " + d.name}
      </li>
    ));

  return (
    <div>
      <ul>{destinationItems}</ul>
      Add new:
      <br />
      <DestinationAdder onAdd={onCreate} />
    </div>
  );
}

function DestinationAdder({ value, onAdd }) {
  const [text, setText] = useState(value);

  let inputElement = null;

  const handleSubmit = () => {
    onAdd({ name: text });
    setText("");
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleValueChanged = event => {
    setText(event.target.value);
  };

  const handleInputKeyPress = event => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <label>Name</label>
      <input
        ref={i => (inputElement = i)}
        value={text}
        onChange={handleValueChanged}
        onKeyPress={handleInputKeyPress}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
