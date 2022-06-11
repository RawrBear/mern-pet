import { createRoot } from "react-dom/client";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import CreateNewForm from "./components/CreateNewForm";
import AnimalCard from "./components/AnimalCard";

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
        <div className="container">
            <p>
                <a href="/">&laquo; Back to public homepage</a>
            </p>

            <CreateNewForm setAnimals={setAnimals} />
            <div className="animal-grid">
                {animals.map(function (animal) {
                    return (
                        <AnimalCard
                            key={animal._id}
                            name={animal.name}
                            species={animal.species}
                            photo={animal.photo}
                            id={animal._id}
                            setAnimals={setAnimals}
                        />
                    );
                })}
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
