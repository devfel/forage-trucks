import React from "react";

import reserveIcon from '../../assets/images/icons/reserve.svg'

import "./styles.css"

export interface Reservation {
    id: number;
    date: number;
    staff: string;
    created_at: string;
    vehicle_id: number;
    name: string;
    avatar: string;
    bio: string
}

const ReservationItem: React.FunctionComponent<Reservation> = ({ id, date, staff, created_at, vehicle_id, name, avatar, bio }) => {
    const dReserved = new Date(+date).toUTCString().split(' ').slice(0, 4).join(' ');
    const dCreated = new Date(created_at).toLocaleString();


    return (
        <article className="reservation-item">
            <div className="text-information">
                <header>
                    <strong>{staff}</strong>
                    <span>Reservation ID: {id}</span>
                    <span>Date: {dReserved}</span>
                    <span>Reservation Created at: {dCreated} GMT</span>
                </header>

                <p>Vehicle ID: {vehicle_id}</p>
                <p>Vehicle Name: {name}</p>
                <p>Vehicle Description: {bio}</p>
            </div>

            <img src={`/forage-trucks/images/${avatar}.png`} alt={name} />
        </article>
    );
}

export default ReservationItem;