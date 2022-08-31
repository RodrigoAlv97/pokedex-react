import React from "react";
import capitalize from "../modules/capitalize";

export default function Abilities(props) {
  return (
    <div>
      {props.ability.map((ability) => {
        return (
          <div className="ability" key={ability.name}>
            <div className="ability-name">{capitalize(ability.name).replace("-", " ")}</div>
            <div>{ability.text}</div>
          </div>
        );
      })}
    </div>
  );
}
