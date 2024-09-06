interface Adresse {
    Vorname: string;
    Nachname: string;
    "E-Mail": string;
    Telefon: string;
    PLZ: number;
    Ort: string;
    Land: string;
}

interface TableProps {
    headers: string[];
    data: Adresse[];
}

const Table = ({ headers, data }: TableProps): JSX.Element => {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) =>
                        <th key={`header${index}`}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((address, index) =>
                    <tr key={`address${index}`} >
                        <td key={`vorname${index}`}>{address.Vorname}</td>
                        <td key={`nachname${index}`}>{address.Nachname}</td>
                        <td key={`email${index}`}>{address["E-Mail"]}</td>
                        <td key={`telefon${index}`}>{address.Telefon}</td>
                        <td key={`plz${index}`}>{address.PLZ}</td>
                        <td key={`ort${index}`}>{address.Ort}</td>
                        <td key={`land${index}`}>{address.Land}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;