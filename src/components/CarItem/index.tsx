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
        console.log("CRIANDO NOVA RESERVA");
        console.log(stringDate)
        //REFRESH PAGE TO HIDE ITEM RESERVED.
        window.location.reload();

        //MENSAGEM DE AVISO DE RESERVA CONFIRMADA.
        alert("Vehicle Reserved Successfully!")
    }


    return (
        <article className="car-item">
            <header>
                <img src={avatar} alt={name} />
                <div>
                    <strong>{name}</strong>
                </div>
            </header>

            <p>
                <strong>Description: </strong> {bio}
            </p>


            <footer>

                <strong>License Plate: {name}</strong>

                <a onClick={createNewReservation} type="button">
                    <img id="reserveIcon" src={reserveIcon} alt="Reserve Icon" />
                    Reserve Truck
                </a>
            </footer>

        </article>
    );
}

export default CarItem;