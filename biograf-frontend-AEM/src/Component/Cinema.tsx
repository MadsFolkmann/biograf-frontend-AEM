//Inspiration: https://codesandbox.io/p/sandbox/movie-seat-booking-xcmdj?file=%2Fsrc%2FApp.js%3A2%2C2-2%2C21

import clsx from "clsx";
import './Cinema.css';

export default function Cinema({ forestilling, selectedSeats, onSelectedSeatsChange }) {
    //Funktion til at vælge sæder
    function handleSelectedState(sæde) {
        const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.id === sæde.id);
        if (isSelected) {
            onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat.id !== sæde.id));
        } else {
            onSelectedSeatsChange([...selectedSeats, sæde]);
        }
    }

    
    return (
        <div className="Cinema">
            <div className="screen" />
            {Object.values( 
                forestilling.sæder.reduce((rows, sæde) => { //Reducerer sæderne til rækker
                    if (!rows[sæde.række]) {
                        rows[sæde.række] = [];
                    }
                    rows[sæde.række].push(sæde);
                    return rows;
                }, {}))
                .map((row: any)=> row.sort((a, b) => a.sædeNummer - b.sædeNummer)) //Sorterer rækkerne efter sædenummer
                .map((row, index) => (
                <div key={index} className="row">
                    {row.map((sæde) => {
                        const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.id === sæde.id); //Tjekker om sædet er valgt
                        const isOccupied = sæde.optaget;

                        return (
                            <span
                                key={`${sæde.sædeNummer}-${sæde.række}`}
                                className={clsx("seat", isSelected && "selected", isOccupied && "occupied")}
                                onClick={isOccupied ? null : () => handleSelectedState(sæde)}//Hvis sædet er optaget, kan det ikke vælges
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}