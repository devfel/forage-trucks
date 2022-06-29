import React from "react";

import reserveIcon from '../../assets/images/icons/reserve.svg'
import api from "../../services/api";
import "./styles.css"

export interface VehicleReservation {
    vehicle_id: number;
    avatar: string;
    bio: string;
    name: string; //Car Name.
    periodSelected: string; //period selected on the input.
    stringDate: number;
    nameSelected: string; //Staff Reserving the Vehicle.
    reservationsList: VehicleReservationsItem[];
}

export interface VehicleReservationsItem {
    reservation_id: number;
    staff_reserved: string;
    created_at: string;
    period: string;
}

const CarReservedItem: React.FunctionComponent<VehicleReservation> = ({ periodSelected, vehicle_id, avatar, bio, name, stringDate, nameSelected, reservationsList }) => {
    async function createNewReservation() {
        if (!nameSelected) {
            alert("Error: Invalid name, please insert your name.");
        } else {
            try {
                await api.post('reservations', {
                    "date": stringDate,
                    "period": periodSelected,
                    "staff": nameSelected,
                    "vehicle_id": vehicle_id,
                });

                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Success: Vehicle Reserved Successfully.")
            } catch (error) {
                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Error HERE: " + error)
            }
            //REFRESH PAGE TO HIDE ITEM RESERVED.
            window.location.reload();
        }
    }

    const dReserved = new Date(+stringDate).toUTCString().split(' ').slice(0, 4).join(' ');

    return (
        <article className="car-item">
            <img className="car-img" src={`/forage-trucks/images/${avatar}.jpg`} alt={name} />
            <div className="text-info">
                <header>
                    <strong>{name}</strong>
                </header>

                <p>
                    <strong>Description: </strong> {bio}
                </p>

                <div className="reservations-list">
                    <p><b>Reservations Priority for {dReserved}</b></p>
                    {
                        reservationsList.map((reservationItem: VehicleReservationsItem, index) => {
                            return (
                                <p key={reservationItem.reservation_id}>
                                    <b>{index + 1}</b>: {reservationItem.staff_reserved} - <i>Period: <b>{reservationItem.period}</b></i>
                                </p>
                            )
                        })
                    }
                </div>
            </div>


            <footer>
                <button disabled={false} onClick={createNewReservation} type="button">
                    <img id="reserveIcon" src={reserveIcon} alt="Reserve Icon" />
                    Confirm Truck
                </button>
                <strong> {new Date(stringDate).toUTCString().split(' ').slice(0, 4).join(' ')} </strong>
            </footer>
        </article>
    );
}

export default CarReservedItem;