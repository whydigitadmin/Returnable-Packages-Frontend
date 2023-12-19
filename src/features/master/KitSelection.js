import React, { useEffect, useState } from 'react';
import './KitSelection.css';

function KitSelection(props) {
  const palletSeats = Array.from({ length: 50 }, (_, index) => `PA${index + 1}`);
  const lidSeats = Array.from({ length: 50 }, (_, index) => `LID${index + 1}`);
  const sidewallSeats = Array.from({ length: 50 }, (_, index) => `SW${index + 1}`);
  const selectedQuantity = 20;

  const [seatState, setSeatState] = useState({
    pallet: [...palletSeats],
    lid: [...lidSeats],
    sidewall: [...sidewallSeats],
    palletAvailable: [...palletSeats],
    lidAvailable: [...lidSeats],
    sidewallAvailable: [...sidewallSeats],
    palletReserved: [],
    lidReserved: [],
    sidewallReserved: [],
    palletBookedSlots: [], // Example of booked slots for pallet
    lidBookedSlots: [], // Example of booked slots for lid
    sidewallBookedSlots: [] // Example of booked slots for sidewall
    // other states...
  });

  const autoSelectSeats = () => {
    // Automatically select 10 seats when selectedQuantity is 10
    if (
      seatState.palletReserved.length < selectedQuantity &&
      seatState.lidReserved.length < selectedQuantity &&
      seatState.sidewallReserved.length < selectedQuantity
    ) {
      const palletToSelect = seatState.palletAvailable.slice(0, selectedQuantity);
      const lidToSelect = seatState.lidAvailable.slice(0, selectedQuantity);
      const sidewallToSelect = seatState.sidewallAvailable.slice(0, selectedQuantity);

      setSeatState(prevState => ({
        ...prevState,
        palletReserved: [...prevState.palletReserved, ...palletToSelect],
        lidReserved: [...prevState.lidReserved, ...lidToSelect],
        sidewallReserved: [...prevState.sidewallReserved, ...sidewallToSelect],
        palletAvailable: prevState.palletAvailable.filter(seat => !palletToSelect.includes(seat)),
        lidAvailable: prevState.lidAvailable.filter(seat => !lidToSelect.includes(seat)),
        sidewallAvailable: prevState.sidewallAvailable.filter(seat => !sidewallToSelect.includes(seat))
      }));
    }
  };

  useEffect(() => {
    autoSelectSeats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component mount

  const onClickData = (seat, sectionType) => {
    // Your existing code for handling seat clicks...
  };

  return (
    <div>
      <div className="grid-container">
        <DrawGrid
          sectionType="Pallet"
          seat={seatState.pallet}
          available={seatState.palletAvailable}
          reserved={seatState.palletReserved}
          bookedSlots={seatState.palletBookedSlots}
          onClickData={(seat) => onClickData(seat, 'Pallet')}
        />
        <DrawGrid
          sectionType="Lid"
          seat={seatState.lid}
          available={seatState.lidAvailable}
          reserved={seatState.lidReserved}
          bookedSlots={seatState.lidBookedSlots}
          onClickData={(seat) => onClickData(seat, 'Lid')}
        />
        <DrawGrid
          sectionType="Sidewall"
          seat={seatState.sidewall}
          available={seatState.sidewallAvailable}
          reserved={seatState.sidewallReserved}
          bookedSlots={seatState.sidewallBookedSlots}
          onClickData={(seat) => onClickData(seat, 'Sidewall')}
        />
      </div>
    </div>
  );
}


function DrawGrid(props) {
  const { reserved, bookedSlots } = props;

  const isSlotBooked = (slot) => bookedSlots.includes(slot);

  const onClickSeat = (seat) => {
    props.onClickData(seat);
  };

  return (
    <div className="container">
     <span className='mt-4'><h2><b>{props.sectionType}</b></h2></span>
      <table className="grid">
        <tbody>
          <tr>
            {props.seat.map(row => (
              <td
                className={reserved.includes(row) ? 'reserved' : (isSlotBooked(row) ? 'grey' : 'available')}
                key={row}
                onClick={() => onClickSeat(row)}
              >
                {row}
              </td>
            ))}
          </tr>
        </tbody>
      </table>


    </div>
  );
}

// Other components...

export default KitSelection;
