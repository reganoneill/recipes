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
                    <Link to="/">Recipe Ref</Link>
                </header>
                <Router>
                    <SearchParams path="/" />
                    {/* <Details path="/details/:id" /> */}
                </Router>
            </div>
        </ThemeContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));