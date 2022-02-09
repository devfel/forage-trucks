import React, { useEffect, useState } from 'react';
import CarItem, { Vehicle } from "../../components/CarItem";
import CarReservedItem, { VehicleReservation } from "../../components/CarReservedItem";
import PageHeader from "../../components/PageHeader";
import api from '../../services/api';
import loading2 from "../../assets/images/loading2.gif";

import "./styles.css"

function ReserveCar() {
    const today = new Date();
    const formatedToday = (today.getFullYear() + "-" + (today.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + "-" + today.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }));

    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [reservationsList, setReservationsList] = useState<any[]>([]);

    const [dateSelected, setDateSelected] = useState(formatedToday);
    const [nameSelected, setNameSelected] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("forage-trucks-name");
        const initialValue = JSON.parse(saved as any);
        return initialValue || "";
    });
    const [loading, setLoading] = useState(true);

    const stringDate = Date.parse(dateSelected);

    // storing input name
    useEffect(() => {
        localStorage.setItem("forage-trucks-name", JSON.stringify(nameSelected));
    }, [nameSelected]);

    // Whenever the date changes this function searchs for Vehicles avaible on the DB
    useEffect(() => {
        api.get('vehicles', { params: { date: stringDate } })
            .then(response => {
                setLoading(true);
                setAvailableVehicles(response.data);
                setLoading(false);
            });
    }, [stringDate]);

    // Whenever the date changes this function searchs for Vehicles Reserved
    useEffect(() => {
        api.get('reservations')
            .then(response => {
                setLoading(true);
                setReservationsList(response.data);
                setLoading(false);
            });
    }, [stringDate]);
    const reservationsListOnDate = reservationsList.filter(el => el.date === stringDate + "");

    return (
        <div id="page-reserve-car" className="container">
            <PageHeader title="These are the registered cars available.">

                <form id="search-trucks">
                    <div className="input-block">
                        <label htmlFor="subjectDate">Select a date: </label>
                        {// <input type="date" id="subjectDate" value={dateSelected} onChange={(e) => { searchAvailableVehicles(e) }} />
                        }
                        <input type="date" id="subjectDate" value={dateSelected} onChange={(e) => { setDateSelected(e.target.value) }} />

                    </div>
                    <div className="input-block">
                        <label htmlFor="subjectName">Write your name: </label>
                        <input type="text" id="subjectName" value={nameSelected} onChange={(e) => { setNameSelected(e.target.value) }} />
                    </div>
                </form>


            </PageHeader>


            <main>
                {loading ? (<div><img src={loading2} width="70px" alt="Loading" />{"Loading Data. Please Wait."}</div>) : null}
                {
                    availableVehicles.map((vehicle: Vehicle) => {
                        return <CarItem key={vehicle.id} id={vehicle.id} name={vehicle.name} avatar={vehicle.avatar} bio={vehicle.bio} stringDate={stringDate} nameSelected={nameSelected} />;
                    })

                }
                {
                    reservationsListOnDate.map((vehicle: VehicleReservation) => {
                        return <CarReservedItem key={vehicle.id} staff={vehicle.staff} id={vehicle.id} name={vehicle.name} avatar={vehicle.avatar} bio={vehicle.bio} stringDate={stringDate} nameSelected={nameSelected} />;
                    })

                }
            </main>

        </div>


    )
}

export default ReserveCar;