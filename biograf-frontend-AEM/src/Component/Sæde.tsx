// import React, { useState, useEffect } from 'react';
// import { getSæder } from '../services/apiFacade';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../security/AuthProvider';
// import './Sal.css';
//
// interface Sæde {
//     id: number;
//     række: number;
//     sædeNummer: number;
//     sædeType: string;
//     pris: number;
//     optaget: boolean;
// }
//
// const Seat: React.FC<Sæde & { onSeatClick: (id: number) => void }> = ({ id, række, sædeNummer, optaget, onSeatClick }) => {
//     const statusClass = optaget ? 'seat-reserved' : 'seat-available';
//
//     return (
//         <button className={`seat ${statusClass}`} onClick={() => onSeatClick(id)} disabled={optaget}>
//             {række}-{sædeNummer}
//         </button>
//     );
// };
//
// export const Sæde = () => {
//     const [sæder, setSæder] = useState<Sæde[]>([]);
//     const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
//     const auth = useAuth();
//
//     useEffect(() => {
//         getSæder().then((res) => {
//             console.log(res); // Log the fetched data
//             setSæder(res);
//         });
//     }, []);
//
//     const handleSeatClick = (id: number) => {
//         const seatIndex = sæder.findIndex(seat => seat.id === id);
//         const updatedSæder = [...sæder];
//         updatedSæder[seatIndex].optaget = !updatedSæder[seatIndex].optaget;
//         setSæder(updatedSæder);
//
//         setSelectedSeats((prevSelectedSeats) =>
//             prevSelectedSeats.includes(id) ? prevSelectedSeats.filter((seatId) => seatId !== id) : [...prevSelectedSeats, id]
//         );
//     };
//
//     return (
//         <div className="sæde-container">
//             <h2 className="sæde-header">Sæder</h2>
//             <p>Se sæder.</p>
//
//             <div className="sæde-grid">
//                 {sæder.map((sæde) => (
//                     <Seat key={sæde.id} {...sæde} onSeatClick={handleSeatClick} />
//                 ))}
//             </div>
//
//             {auth.isLoggedInAs(['ADMIN', 'USER']) && (
//                 <Link to="/addSæde" className="sæde-edit">
//                     Edit
//                 </Link>
//             )}
//         </div>
//     );
// };
