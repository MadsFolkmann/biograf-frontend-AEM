import React, { useState } from 'react';

const BestillingForm = () => {
  const [bestilling, setBestilling] = useState({
    name: '',
    email: '',
    // Add other fields as necessary
  });

  const handleChange = (event) => {
    setBestilling({
      ...bestilling,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5173/bestilling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bestilling),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success - clear form, show success message, etc.
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error - show error message, etc.
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={bestilling.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={bestilling.email} onChange={handleChange} />
      </label>
      {/* Add other fields as necessary */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BestillingForm;