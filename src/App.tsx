import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Table from "./components/Table";
import EditAddress from "./components/EditAddress";
import AddAddress from "./components/AddAddress";
import data from "./data/test_adressen_human_readable.json";
import Adresse from "./components/Interface"

const headers: string[] = ["Vorname", "Nachname", "E-Mail", "Telefon", "PLZ", "Ort", "Land"];

const App: React.FC = () => {

    const [adressDaten, setAdressDaten] = useState<Adresse[]>(data);

    /* Dummy Aufruf zum Abrufen der adressDaten aus der Datenbank
   (in Wirklichkeit werden adressdaten aus der JSON-Datei importiert)

    useEffect(() => {
        addressService.getAll().then((adressen: Adresse[]) => setAdressDaten(adressen))
            .catch(error=>console.log(error))
    })
    */

    return (
        <Routes>
            <Route path="/" element={
                <div className="App">
                    <span className="head">Adressverwaltung</span>
                    <AddAddress adressDaten={adressDaten} setAdressDaten={setAdressDaten}></AddAddress>
                    <Table headers={headers} data={adressDaten}></Table>
                </div>
            } />
            <Route path="/edit/:index" element={
                <EditAddress adressDaten={adressDaten} setAdressDaten={setAdressDaten} />}
            />
        </Routes >
    );
}

export default App;
