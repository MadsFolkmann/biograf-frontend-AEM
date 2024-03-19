import React from 'react';

const SeatSelection = ({ seats, setSeats }) => {
  const handleSeatChange = (e) => {
    setSeats(e.target.value);
  };

  return (
    <select onChange={handleSeatChange}>
      {seats.map(s => <option key={s.id} value={s.id}>{s.number}</option>)}
    </select>
  );
};

export default SeatSelection;