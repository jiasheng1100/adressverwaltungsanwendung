import React, { useState } from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Table from "./components/Table";
import data from "./data/test_adressen_human_readable.json";

const headers: string[] = ["Vorname", "Nachname", "E-Mail", "Telefon", "PLZ", "Ort", "Land"];

interface Adresse {
    Vorname: string;
    Nachname: string;
    "E-Mail": string;
    Telefon: string;
    PLZ: number;
    Ort: string;
    Land: string;
}


const App: React.FC = () => {
    const [vorname, setVorname] = useState<string>("");
    const [nachname, setNachname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefon, setTelefon] = useState<string>("");
    const [plz, setPlz] = useState<string>("");
    const [ort, setOrt] = useState<string>("");
    const [land, setLand] = useState<string>("");
    const [adressDaten, setAdressDaten] = useState<Adresse[]>(data);
    const [error, setError] = useState<string>("");
    const [nachricht, setNachricht] = useState<string>("");

    const validiereBenutzereingabe = (): boolean => {
        // überprüf ob alle Felder gefüllt sind
        if (!vorname || !nachname || !email || !telefon || !telefon || !plz || !ort || !land) {
            setError("Alle Felder sind erforderlich");
            return false;
        }

        // Email Format
        if (!(/^\S+@\S+\.\S+$/.test(email))) {
            setError("E-Mail sollte im Format 'etwas@etwas.etwas' sein");
            return false;
        }

        // Telefon Format
        if (!(/^\+[0-9]{2}\s[0-9]{3}\s[0-9]{7,8}$/.test(telefon))) {
            setError("Telefonnummer sollte im Format +00 000 0000000 sein");
            return false;
        }

        // PLZ Format
        if (!(/^[0-9]{5}$/.test(plz))) {
            setError("PLZ sollte genau 5 Ziffern haben");
            return false;
        }

        return true;
    }


    const neueAdresseHandler = (e: React.FormEvent) => {
        // das Neuladen der Seite verhindern
        e.preventDefault()

        // wenn Benutzereingabe die Validierung nicht besteht, tun nichts
        if (!validiereBenutzereingabe()) {
            return;
        }

        const adresse = {
            "Vorname": vorname,
            "Nachname": nachname,
            "E-Mail": email,
            "Telefon": telefon,
            "PLZ": Number(plz),
            "Ort": ort,
            "Land": land
        }

        setAdressDaten([...adressDaten, adresse])

        setVorname("");
        setNachname("");
        setEmail("");
        setTelefon("");
        setPlz("");
        setOrt("");
        setLand("");
        setError("");
        setNachricht("Neue Adresse erfolgreich hinzugefügt");

    }


    return (
        <div className="App">
            <span className="head">Adressverwaltung</span>
            {nachricht && <p className="message">{nachricht}</p>}
            <form className="input">
                <input type="input" placeholder="Vorname" value={vorname} onChange={(e) => setVorname(e.target.value)}></input>
                <input type="input" placeholder="Nachname" value={nachname} onChange={(e) => setNachname(e.target.value)}></input>
                <input type="input" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="input" placeholder="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)}></input>
                <input type="input" placeholder="PLZ" value={plz} onChange={(e) => setPlz(e.target.value)}></input>
                <input type="input" placeholder="Ort" value={ort} onChange={(e) => setOrt(e.target.value)}></input>
                <input type="input" placeholder="Land" value={land} onChange={(e) => setLand(e.target.value)}></input>
                {error && <p className="error">{error}</p>}
                <button onClick={neueAdresseHandler}>Add address</button>
            </form>
            <Table headers={headers} data={adressDaten}></Table>
        </div>
    );
}

export default App;
