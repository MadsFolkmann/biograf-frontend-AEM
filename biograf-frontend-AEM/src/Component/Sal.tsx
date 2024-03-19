import React, { useState, useEffect } from 'react';
import { getSaler } from '../services/apiFacade'; // Assuming you have a function named `getSaler` to fetch sal data
import { Link } from 'react-router-dom';
import { useAuth } from '../security/AuthProvider';
import './Sal.css'; // Update CSS import if needed

interface Sal {
    id: number;
    name: string;
    seats: Seat[];
}

interface Seat {
    id: number;
    row: number;
    seatNumber: number;
    type: string;
    price: number;
    occupied: boolean;
}

const Seat: React.FC<Seat & { onSeatClick: (id: number) => void }> = ({ id, row, seatNumber, type, occupied, onSeatClick }) => {
    const statusClass = occupied ? 'seat-reserved' : 'seat-available';

    return (
        <button className={`seat ${statusClass}`} onClick={() => onSeatClick(id)} disabled={occupied}>
            {row}-{seatNumber}
        </button>
    );
};

export const Sal: React.FC = () => {
    const [saler, setSaler] = useState<Sal[]>([]); // Assuming you're fetching an array of sal entities
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const auth = useAuth();

    useEffect(() => {
        getSaler().then((res) => {
            console.log(res); // Log the fetched data
            setSaler(res);
        });
    }, []);

    const handleSeatClick = (id: number) => {
        // Handle seat click logic here
    };

    return (
        <div className="sal-container">
            <h2 className="sal-header">Saler</h2>
            <p>Se saler.</p>

            <div className="sal-grid">
                {saler.map((sal) => (
                    <div key={sal.id}>
                        <h3>{sal.name}</h3>
                        <div className="seat-row">
                            {sal.seats.map((seat) => (
                                <Seat key={seat.id} {...seat} onSeatClick={handleSeatClick} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {auth.isLoggedInAs(['ADMIN', 'USER']) && (
                <Link to="/addSal" className="sal-edit">
                    Edit
                </Link>
            )}
        </div>
    );
};

