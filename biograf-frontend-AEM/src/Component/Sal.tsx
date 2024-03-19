import React, { useState } from 'react';
import './Sal.css';

interface SalProps {
    sæder?: string[]; // Gør sæder prop valgfri
}

const Sal: React.FC<SalProps> = ({ sæder = [] }) => { // Sætter default værdi for sæder til tom array
    const [valgteSæder, setValgteSæder] = useState<string[]>([]);

    const toggleSæde = (sæde: string) => {
        const erValgt = valgteSæder.includes(sæde);
        setValgteSæder(erValgt ? valgteSæder.filter(s => s !== sæde) : [...valgteSæder, sæde]);
    };

    return (
        <div className="sal">
            {sæder.map((sæde, index) => (
                <div
                    key={index}
                    className={`sæde ${valgteSæder.includes(sæde) ? 'valgt' : ''}`}
                    onClick={() => toggleSæde(sæde)}
                >
                    {sæde}
                </div>
            ))}
        </div>
    );
};

export default Sal;

