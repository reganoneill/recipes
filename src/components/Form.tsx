import React from "react";
import { navigate } from "@reach/router";
import { IFormOptions } from "../types/IFormOptions";

function _navigate(props: IFormOptions) {
  if (
    props.alternateNextUrl &&
    props.selected === props.alternateNextUrl.case
  ) {
    navigate(props.alternateNextUrl.url);
  } else {
    navigate(props.nextUrl);
  }
}

const Form = (props: IFormOptions) => {
  return (
    <div className="formContainer">
      <div className="limitWidth15 zigzag">
        <p className="formTitle">{props.title}</p>
      </div>
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
        onClick={() => _navigate(props)}
      >
        Next
      </button>
    </div>
  );
};

export default Form;
