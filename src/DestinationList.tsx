import React, { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { localeCompareWithSelector } from "./util/compare";
import { Destination, DestinationInfo } from "./interfaces";

interface DestinationListProps {
  groupId: string;
  destinations: Destination[];
  onCreate(d: DestinationInfo): void;
  onDelete(d: DestinationInfo): void;
}

export default function DestinationList({ groupId, destinations, onCreate, onDelete }: DestinationListProps) {
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
      <DestinationAdder groupId={groupId} onAdd={onCreate} />
    </div>
  );
}

interface DestinationAdderProps {
  groupId: string;
  onAdd(d: DestinationInfo): void;
}

function DestinationAdder({ groupId, onAdd }: DestinationAdderProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onAdd({ groupId, name: text });
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
