import React, { useState, ChangeEvent } from "react";
import { Group, User } from "./interfaces";

interface GroupSelectorProps {
  user: User;
  onSelect(g: Group): void;
}

export function GroupSelector({ user, onSelect }: GroupSelectorProps) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(
    user.groups[0]
  );

  if (!user.groups.length) {
    return <p>User '{user.displayName}' is not a member of any groups.</p>;
  }

  const groups = user.groups.map(g => <option value={g.id}>{g.name}</option>);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const group = user.groups.find(g => g.id === e.target.value);
    setSelectedGroup(group || null);
  };
  const handleSubmit = () => {
    if (selectedGroup) {
      onSelect(selectedGroup);
    }
  };

  return (
    <div>
      <p>no group selected</p>
      <select
        value={(selectedGroup && selectedGroup.id) || ""}
        onChange={handleChange}
      >
        {groups}
      </select>
      <button onClick={handleSubmit}>Switch</button>
    </div>
  );
}
