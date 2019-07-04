import React from "react";
import { useState } from "react";

export default function Picker({ destinations }) {
  const [picked, setPicked] = useState();
  const handlePick = () => {
    const { dest } = destinations
      .map(dest => ({ dest, sort: Math.random() }))
      .reduce((winner, next) => (winner.sort > next.sort ? winner : next));
    setPicked(dest);
  };

  if (!destinations || !destinations.length) {
    return <div />;
  }

  return (
    <div>
      <button onClick={handlePick}>Pick</button>{" "}
      {(picked && picked.name) || "\xA0"}
    </div>
  );
}
