// import React, { useState, FunctionComponent } from "react";
// import { RouteComponentProps } from "@reach/router";

// function useDropdown(
//     label: string,
//     defaultState: string,
//     options: string[]
//     ): [string, () => JSX.Element, (newState: string) => void] {
//     const [state, updateState] = useState(defaultState);

//     const id = `use-dropdown-${label.replace(" ","").toLowerCase()}`;
//     const Dropdown = () => (
//         <label htmlFor={id}>
//             {label.toLowerCase()}
//             <select
//                 id={id}
//                 value={state}
//                 className="filterSelect"
//                 onChange={e => updateState(e.target.value)}
//                 onBlur={e => updateState(e.target.value)}
//                 disabled={!options.length}
//             >
//                 {options.map((item) => (
//                     <option key={item} value={item}>
//                         {item}
//                     </option>
//                 ))}
//             </select>
//         </label>
//     );

//     return [state, Dropdown, updateState];
// }

// export default useDropdown;

import React, { useState, FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

function useDropdown(
    label: string,
    defaultState: string,
    options: string[]
    ): [string, () => JSX.Element, (newState: string) => void] {
    const [state, updateState] = useState(defaultState);

    const id = `use-dropdown-${label.replace(" ","").toLowerCase()}`;
    const Dropdown = () => (
        <select
            id={id}
            value={state}
            className="filterSelect"
            onChange={e => updateState(e.target.value)}
            onBlur={e => updateState(e.target.value)}
            disabled={!options.length}
        >
            {options.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );

    return [state, Dropdown, updateState];
}

export default useDropdown;