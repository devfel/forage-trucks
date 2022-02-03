import React from "react";

import reserveIcon from '../../assets/images/icons/reserve.svg'
import api from "../../services/api";
import "./styles.css"
import "./modal.css";
import { useState } from 'react';

export interface Vehicle {
    id: number;
    avatar: string;
    bio: string;
    name: string; //Car Name.
    stringDate: number;
    nameSelected: string; //Staff Reserving the Vehicle.
}

const CarItem: React.FunctionComponent<Vehicle> = ({ id, avatar, bio, name, stringDate, nameSelected }) => {
    const [modalNameError, setModalNameError] = useState(false);
    const toggleModal = () => {
        setModalNameError(!modalNameError);
    };

    async function createNewReservation() {
        if (!nameSelected) {
            alert("Error: Invalid name, please insert you name.");
        } else {
            try {
                await api.post('reservations', {
                    "date": stringDate,
                    "period": "morning",
                    "staff": nameSelected,
                    "vehicle_id": id,
                });

                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Success: Vehicle Reserved Successfully.")
            } catch (error) {
                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Error: " + error)
            }
            //REFRESH PAGE TO HIDE ITEM RESERVED.
            window.location.reload();
        }
    }

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
            </div>


            <footer>
                <strong> {new Date(stringDate).toUTCString().split(' ').slice(0, 4).join(' ')} </strong>
                <a onClick={createNewReservation} type="button">
                    <img id="reserveIcon" src={reserveIcon} alt="Reserve Icon" />
                    Confirm Truck
                </a>
            </footer>
        </article>
    );
}

export default CarItem;