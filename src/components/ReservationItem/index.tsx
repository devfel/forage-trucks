import React from "react";

import "./styles.css"

export interface Reservation {
    id: number;
    date: number;
    staff: string;
    created_at: string;
    vehicle_id: number;
    name: string;
    avatar: string;
    bio: string;
    period: string;
}

const ReservationItem: React.FunctionComponent<Reservation> = ({ id, date, staff, created_at, vehicle_id, period, name, avatar, bio }) => {
    const dReserved = new Date(+date).toUTCString().split(' ').slice(0, 4).join(' ');
    const dCreated = new Date(created_at).toLocaleString();


    return (
        <article className="reservation-item">
            <div className="text-information">
                <header>
                    <strong>{staff}</strong>
                    <span><b>Date: {dReserved}</b></span>
                    <span><b>Period: {period}</b></span>
                    <span>Reservation Created at: {dCreated} GMT</span>
                </header>

                <p>Vehicle Name: {name}</p>
                <p>Vehicle Description: {bio}</p>
            </div>

            <img src={`/forage-trucks/images/${avatar}.jpg`} alt={name} />
        </article>
    );
}

export default ReservationItem;