import React, { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { localeCompareWithSelector } from "./util/compare";
import { Destination } from "./Store";

interface DestinationListProps {
  destinations: Destination[];
  onCreate: Function;
  onDelete: Function;
}

export default function DestinationList({ destinations, onCreate, onDelete }: DestinationListProps) {
  const destinationItems = destinations
    .slice()
    .sort(localeCompareWithSelector(d => d.name))
    .map((d: any) => (
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

function DestinationAdder({ value, onAdd }: any) {
  const [text, setText] = useState(value);

  const handleSubmit = () => {
    onAdd({ name: text });
    setText("");
  };

  const handleValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <label>Name</label>
      <input
        value={text}
        onChange={handleValueChanged}
        onKeyPress={handleInputKeyPress}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
