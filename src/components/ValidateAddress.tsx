interface Props {
    vorname: string;
    nachname: string;
    email: string;
    telefon: string;
    plz: string;
    ort: string;
    land: string;
    message: string;
    setMessage: (error: string) => void;
}

const ValidateAddress = ({ vorname, nachname, email, telefon, plz, ort, land, message, setMessage }: Props): boolean => {
    // überprüf ob alle Felder gefüllt sind
    if (!vorname || !nachname || !email || !telefon || !plz || !ort || !land) {
        setMessage("Error: Alle Felder sind erforderlich");
        return false;
    }

    // Email Format
    if (!(/^\S+@\S+\.\S+$/.test(email))) {
        setMessage("Error: E-Mail sollte im Format 'etwas@etwas.etwas' sein");
        return false;
    }

    // Telefon Format
    if (!(/^\+[0-9]{1,3}\s[0-9]{3,4}\s[0-9]{3,8}$/.test(telefon))) {
        setMessage("Error: Telefonnummer sollte im Format +00 000 0000000 sein");
        return false;
    }

    // PLZ Format
    if (!(/^[0-9]{5}$/.test(plz))) {
        setMessage("Error: PLZ sollte genau 5 Ziffern haben");
        return false;
    }

    return true;
}

export default ValidateAddress;