import clsx from "clsx";
import './Cinema.css';

export default function Cinema({ forestilling, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(sæde) {
        const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.id === sæde.id);
        if (isSelected) {
            onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat.id !== sæde.id));
        } else {
            onSelectedSeatsChange([...selectedSeats, sæde]);
        }
    }

    // Rest of the component...
    return (
        <div className="Cinema">
            <div className="screen" />
            {Object.values(
                forestilling.sæder.reduce((rows, sæde) => {
                    if (!rows[sæde.række]) {
                        rows[sæde.række] = [];
                    }
                    rows[sæde.række].push(sæde);
                    return rows;
                }, {})
            ).map((row, index) => (
                <div key={index} className="row">
                    {row.map((sæde) => {
                        const isSelected = selectedSeats.some((selectedSeat) => selectedSeat.id === sæde.id);
                        const isOccupied = sæde.optaget;

                        return (
                            <span
                                key={`${sæde.sædeNummer}-${sæde.række}`}
                                className={clsx("seat", isSelected && "selected", isOccupied && "occupied")}
                                onClick={isOccupied ? null : () => handleSelectedState(sæde)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}