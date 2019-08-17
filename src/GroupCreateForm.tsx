import React, { useState, useContext } from "react";
import { GroupRepository } from "./store";
import UserContext from "./UserContext";

export function GroupCreateForm({ onCreate }: any) {
  const [name, setName] = useState("");
  const [working, setWorking] = useState(false);
  const user = useContext(UserContext)!;
  const [err, setErr] = useState(null);

  const handleSubmit = () => {
    if (name && user) {
      setWorking(true);
      new GroupRepository()
        .createGroup({ name, users: [user.uid] })
        .then(onCreate, setErr)
        .finally(() => setWorking(false));
    }
  };
  const disabled = !name.length || working;

  return (
    <div>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button disabled={disabled} onClick={handleSubmit}>
          Create
        </button>
      </div>
      {err}
    </div>
  );
}
