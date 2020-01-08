import React from "react";
import { navigate } from "@reach/router";

const Form = (props: any) => {
  return (
    <div className="formContainer">
      <p className="formTitle">{props.title}</p>
      <ul className="selectList">
        {props.options.map((item: string) => {
          if (item === props.selected) {
            return (
              <li key={item} className="selectedOptionListItem">
                {item}
              </li>
            );
          }
          return (
            <li key={item} onClick={() => props.makeSelection(item)}>
              {item}
            </li>
          );
        })}
      </ul>
      <button
        disabled={props.selected.length ? false : true}
        onClick={() => navigate(props.nextUrl)}
      >
        -> Next ->
      </button>
    </div>
  );
};

export default Form;
