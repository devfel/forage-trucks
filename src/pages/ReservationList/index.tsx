import React from "react";
import PageHeader from "../../components/PageHeader";
import ReservationItem from "../../components/ReservationItem";

import "./styles.css"

function ReservationList() {
    return (
        <div id="page-reservation-list" className="container">
            <PageHeader title="List of all reservations done." />

            <main>
                <ReservationItem />
                <ReservationItem />
                <ReservationItem />
            </main>
        </div>
    )
}

export default ReservationList;