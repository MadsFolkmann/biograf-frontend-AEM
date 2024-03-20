import clsx from "clsx";
import './Cinema.css';

export default function Cinema({ forestilling, selectedSeats, onSelectedSeatsChange }) {

function handleSelectedState(seatNumber, rowNumber) {
    const seat = { seatNumber, rowNumber };
    const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.seatNumber === seatNumber && selectedSeat.rowNumber === rowNumber);
    if (isSelected) {
        onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat.seatNumber !== seatNumber || selectedSeat.rowNumber !== rowNumber));
    } else {
        onSelectedSeatsChange([...selectedSeats, seat]);
    }
}

    return (
        <div className="Cinema">
            <div className="screen" />
            <div className="seats">
                {forestilling.sæder.map((sæde) => {
                    const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.seatNumber === sæde.sædeNummer && selectedSeat.rowNumber === sæde.række);
                    const isOccupied = sæde.optaget;
                    console.log(isSelected);
                    
                    return (
                        <span
                            key={`${sæde.sædeNummer}-${sæde.række}`}
                            className={clsx("seat", isSelected && "selected", isOccupied && "occupied")}
                            onClick={isOccupied ? null : () => handleSelectedState(sæde.sædeNummer, sæde.række)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
