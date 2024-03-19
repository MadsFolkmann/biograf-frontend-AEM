// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import Biograf from './Biograf';
// import Film from './Film';
// import SeatSelection from './SeatSelection';
// import OrderTicket from './OrderTicket';
//
// const TicketBooking = () => {
//   const [cinema, setCinema] = useState('');
//   const [movie, setMovie] = useState('');
//   const [seats, setSeats] = useState([]);
//   const history = useHistory();
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     const order = {
//       cinema,
//       movie,
//       seats,
//     };
//
//     const response = await fetch('/api/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(order),
//     });
//
//     const data = await response.json();
//
//     history.push(`/order-confirmation/${data.id}`);
//   };
//
//   return (
//       <form onSubmit={handleSubmit}>
//         <Biograf setCinema={setCinema} />
//         <Film setMovie={setMovie} />
//         <SeatSelection setSeats={setSeats} />
//         <OrderTicket movie={movie} cinema={cinema} seats={seats} />
//         <button type="submit">Book Now</button>
//       </form>
//   );
// };
//
// export default TicketBooking;