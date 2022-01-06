import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import ReservationItem, { Reservation } from "../../components/ReservationItem";
import api from "../../services/api";

import "./styles.css"

function ReservationList() {

    const [reservationsList, setReservationsList] = useState([]);

    // Whenever the date changes this function searchs for Vehicles avaible on the DB
    useEffect(() => {
        api.get('reservations')
            .then(response => { setReservationsList(response.data); });
    }, []);

    return (
        <div id="page-reservation-list" className="container">
            <PageHeader title="List of all reservations done." />

            <main>
                {
                    reservationsList.map((reservation: Reservation) => {
                        return <ReservationItem key={reservation.id} id={reservation.id} date={reservation.date} staff={reservation.staff} created_at={reservation.created_at} vehicle_id={reservation.vehicle_id} name={reservation.name} avatar={reservation.avatar} bio={reservation.bio} />
                    })
                }

            </main>
        </div>
    )
}

export default ReservationList;