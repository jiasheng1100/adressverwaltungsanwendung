import { useState } from 'react';
import ValidateAddress from "./ValidateAddress";
import Adresse from "./Interface"

interface Props {
    adressDaten: Adresse[];
    setAdressDaten: (adressDaten: Adresse[]) => void;
}

const AddAddress = ({ adressDaten, setAdressDaten }: Props) => {
    const [vorname, setVorname] = useState<string>("");
    const [nachname, setNachname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefon, setTelefon] = useState<string>("");
    const [plz, setPlz] = useState<string>("");
    const [ort, setOrt] = useState<string>("");
    const [land, setLand] = useState<string>("");
    const [message, setMessage] = useState<string>("");


    const neueAdresseHandler = (e: React.FormEvent) => {
        // das Neuladen der Seite verhindern
        e.preventDefault()

        // wenn Benutzereingabe die Validierung nicht besteht, tun nichts
        if (!ValidateAddress({ vorname, nachname, email, telefon, plz, ort, land, message, setMessage })) {
            return;
        }

        // neuen adresse Objekt mit Benutzereingaben erstellen
        const adresse = {
            "Vorname": vorname,
            "Nachname": nachname,
            "E-Mail": email,
            "Telefon": telefon,
            "PLZ": Number(plz),
            "Ort": ort,
            "Land": land
        }

        // adresse zur Liste hinzufügen
        setAdressDaten([...adressDaten, adresse])

        // Eingabefelder leeren
        setVorname("");
        setNachname("");
        setEmail("");
        setTelefon("");
        setPlz("");
        setOrt("");
        setLand("");
        setMessage("Neue Adresse erfolgreich hinzugefügt");

        /* Dummy Aufruf zum Erstellen der adresse in der Datenbank

        addressService
            .create(adresse)
            .catch((error) => {console.log(error)})
        */
    }

    return (
        <form className="input">
            <input type="input" placeholder="Vorname" value={vorname} onChange={(e) => setVorname(e.target.value)}></input>
            <input type="input" placeholder="Nachname" value={nachname} onChange={(e) => setNachname(e.target.value)}></input>
            <input type="input" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="input" placeholder="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)}></input>
            <input type="input" placeholder="PLZ" value={plz} onChange={(e) => setPlz(e.target.value)}></input>
            <input type="input" placeholder="Ort" value={ort} onChange={(e) => setOrt(e.target.value)}></input>
            <input type="input" placeholder="Land" value={land} onChange={(e) => setLand(e.target.value)}></input>
            <button onClick={neueAdresseHandler}>Neue Adresse hingzufügen</button>
            {message && <p className="message">{message}</p>}
        </form>
    )
}

export default AddAddress;