import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ValidateAddress from "./ValidateAddress";
import Adresse from "./Interface"

interface Props {
    adressDaten: Adresse[];
    setAdressDaten: (adressDaten: Adresse[]) => void;
}

const EditAddress = ({ adressDaten, setAdressDaten }: Props): JSX.Element => {
    // index der zu bearbeitenden adresse bekommen
    const params = useParams();
    const indexString = params.index;
    const index = Number(indexString);
    const adressItem = adressDaten[index];

    const [adresse, setAdresse] = useState<Adresse>(adressItem);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const inputChangeHandler = (name: string, value: string) => {
        // adresse auf Benutzereingaben aktualisieren
        setAdresse({ ...adresse, [name]: value });
    }

    const editHandler = (e: React.FormEvent) => {
        e.preventDefault();
        // wenn Benutzereingabe die Validierung nicht besteht, tun nichts
        if (!ValidateAddress({
            vorname: adresse.Vorname,
            nachname: adresse.Nachname,
            email: adresse['E-Mail'],
            telefon: adresse.Telefon,
            plz: adresse.PLZ.toString(),
            ort: adresse.Ort,
            land: adresse.Land,
            message, setMessage,
        })) {
            return;
        }

        // bearbeitete adresse in der Liste ersetzen
        const adressDatenUpdate = [...adressDaten];
        adressDatenUpdate[index] = adresse;
        setAdressDaten(adressDatenUpdate);


        /* Dummy Aufruf zum Aktualieren der bearbeitete adresse in der Datenbank

        addressService
            .update(index, adresse)
            .catch((error) => {console.log(error)})
        */

        // zurück zur Startseite navigieren
        navigate("/")
    }

    return (
        <form className="input">
            <input type="input" name="Vorname" value={adresse.Vorname} onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}></input>
            <input type="input" name="Nachname" value={adresse.Nachname} onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}></input>
            <input type="input" name="E-Mail" value={adresse['E-Mail']} onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}></input>
            <input type="input" name="Telefon" value={adresse.Telefon} onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}></input>
            <input type="input" name="PLZ" value={adresse.PLZ} onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}></input>
            <input type="input" name="Ort" value={adresse.Ort} onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}></input>
            <input type="input" name="Land" value={adresse.Land} onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}></input>
            <button onClick={editHandler}>Save</button>
            {message && <p className="error">{message}</p>}
        </form>
    );
};

export default EditAddress;