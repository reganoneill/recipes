import React, { useState } from "react";
import ReactDOM from "react-dom";
import  { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext";
import SearchParams from "./SearchParams";

const App = () => {
    const theme = useState("darkblue");
    return (
        <ThemeContext.Provider value={theme}>
            <div className="mainContainer">
                <header>
                    {/* TODO: add this in later when layout comes together */}
                    {/* <Link to="/">Recipe Ref</Link> */}
                </header>
                <Router>
                    <SearchParams path="/" />
                    {/* TODO: add this in later to reference individual recipes */}
                    {/* <Details path="/details/:id" /> */}
                </Router>
            </div>
        </ThemeContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));