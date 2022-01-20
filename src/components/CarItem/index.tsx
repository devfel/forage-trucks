import React from "react";

import reserveIcon from '../../assets/images/icons/reserve.svg'
import api from "../../services/api";

import "./styles.css"

export interface Vehicle {
    id: number;
    avatar: string;
    bio: string;
    name: string;
    stringDate: number;
    nameSelected: string;
}


const CarItem: React.FunctionComponent<Vehicle> = ({ id, avatar, bio, name, stringDate, nameSelected }) => {

    function createNewReservation() {
        api.post('reservations', {
            "date": stringDate,
            "period": "morning",
            "staff": nameSelected,
            "vehicle_id": id,
        })
        //REFRESH PAGE TO HIDE ITEM RESERVED.
        window.location.reload();

        //CONFIRMATION OF RESERVATION MESSAGE
        alert("Vehicle Reserved Successfully!")
    }


    return (
        <article className="car-item">
            <img className="car-img" src={`/forage-trucks/images/${avatar}.png`} alt={name} />
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