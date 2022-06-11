import { createRoot } from "react-dom/client";
import Axios from "axios";

import React, { useEffect, useState } from "react";

function App() {
    const [animals, setAnimals] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get("/api/animals");
            setAnimals(result.data); // result.data is the data from the server
        }
        fetchData();
    }, []);

    return (
        <div>
            {animals.map((animal) => {
                return (
                    <AnimalCard name={animal.name} species={animal.species} />
                );
            })}
        </div>
    );
}

function AnimalCard(props) {
    return (
        <p>
            Hi, my name is {props.name} and I am a {props.species}
        </p>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
