import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import ReservationItem, { Reservation } from "../../components/ReservationItem";
import api from "../../services/api";
import loading2 from "../../assets/images/loading2.gif";

import "./styles.css"

function ReservationList() {

    const [reservationsList, setReservationsList] = useState<Array<Reservation>>([]);
    const [loading, setLoading] = useState(true);

    // Whenever the date changes this function searchs for Vehicles avaible on the DB
    useEffect(() => {
        api.get('reservations')
            .then(response => {
                setLoading(true);
                setReservationsList(response.data);
                setLoading(false);
            });
    }, []);

    return (
        <div id="page-reservation-list" className="container">
            <PageHeader title="List of all reservations done." />

            <main>
                {loading ? (<div><img src={loading2} width="70px" alt="Loading" />{"Loading Data. Please Wait."}</div>) : null}
                {
                    reservationsList.sort(function (a, b) { return (a.id - b.id); }).slice(0).reverse().map((reservation: Reservation) => {
                        return <ReservationItem key={reservation.id} id={reservation.id} date={reservation.date} staff={reservation.staff} created_at={reservation.created_at} period={reservation.period} vehicle_id={reservation.vehicle_id} name={reservation.name} avatar={reservation.avatar} bio={reservation.bio} />
                    })
                }
            </main>
        </div>
    )
}

export default ReservationList;