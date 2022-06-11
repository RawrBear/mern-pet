import { createRoot } from "react-dom/client";

import React from "react";

function App() {
    return (
        <div>
            <h1>Hello</h1>
            <p>This is from React</p>
        </div>
    );
}

function AnimalCard(props) {
    return (
        <div>
            <p>
                Hi, my name is {props.name} and I am a {props.species}
            </p>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
