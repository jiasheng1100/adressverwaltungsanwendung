import React from 'react';
import "./App.css"
import Table from "./components/Table"
import data from "./data/test_adressen_human_readable.json"

const headers: string[] = ["Vorname", "Nachname", "E-Mail", "Telefon", "PLZ", "Ort", "Land"];

console.log(data)

const App: React.FC = () => {
    return (
        <div className="App">
            <span className="heading">Adressverwaltung</span>
            <Table headers={headers} data={data}></Table>
        </div>

    );
}

export default App;
