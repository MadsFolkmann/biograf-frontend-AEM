import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const TicketBooking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [movie, setMovie] = useState<Forestilling | null>(null);
  const [seats, setSeats] = useState<Sæde[]>([]);
  const [movies, setMovies] = useState<Forestilling[]>([]);
  const [availableSeats, setAvailableSeats] = useState<Sæde[]>([]);

  const history = useHistory();

  useEffect(() => {
    const fetchMovies = async () => {
      // Replace with your actual API call
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    };

    const fetchSeats = async () => {
      // Replace with your actual API call
      const response = await fetch('/api/seats');
      const data = await response.json();
      setAvailableSeats(data);
    };

    fetchMovies();
    fetchSeats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order: BestillingDtoRequest = {
      name,
      email,
      forestilling: movie,
      sæder: seats,
      // Add other necessary fields
    };

    // Replace with your actual API call
    const response = await fetch('/api/bestilling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    history.push(`/order-confirmation/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <select value={movie} onChange={e => setMovie(e.target.value)}>
        {movies.map(m => <option key={m.id} value={m}>{m.title}</option>)}
      </select>
      <select multiple value={seats} onChange={e => setSeats(Array.from(e.target.selectedOptions, option => option.value))}>
        {availableSeats.map(s => <option key={s.id} value={s}>{s.number}</option>)}
      </select>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default TicketBooking;