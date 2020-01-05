import React, { useState, FunctionComponent } from "react";

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
            data-testid={id}
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