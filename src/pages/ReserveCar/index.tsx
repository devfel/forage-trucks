import React, { useEffect, useState } from 'react';
import CarItem, { Vehicle } from "../../components/CarItem";
import CarReservedItem, { VehicleReservation, VehicleReservationsItem } from "../../components/CarReservedItem";
import PageHeader from "../../components/PageHeader";
import api from '../../services/api';
import loading2 from "../../assets/images/loading2.gif";

import "./styles.css"
import { time } from 'console';

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
    const [wholeDay, setWholeDay] = useState(true);
    const [periodHoursFrom, setPeriodHoursFrom] = useState("06:00");
    const [periodHoursTo, setPeriodHoursTo] = useState("22:00");
    const [loading, setLoading] = useState(true);

    const stringDate = Date.parse(dateSelected);

    const suffixHoursFrom = (parseInt(periodHoursFrom.split(':')[0]) >= 12) ? "PM" : "AM";
    const suffixHoursTo = (parseInt(periodHoursTo.split(':')[0]) >= 12) ? "PM" : "AM";

    const timeFromInAMPM = ((parseInt(periodHoursFrom.split(':')[0]) + 11) % 12 + 1) + ":" + (periodHoursFrom.split(':')[1]) + " " + suffixHoursFrom;
    const timeToInAMPM = ((parseInt(periodHoursTo.split(':')[0]) + 11) % 12 + 1) + ":" + (periodHoursTo.split(':')[1]) + " " + suffixHoursTo;

    const periodSelected = wholeDay ? "Entire Day" : timeFromInAMPM + " to " + timeToInAMPM;

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
    //Filter Full ReservationsList to only consider the correct date. 
    const reservationsListOnDate = reservationsList.filter(el => el.date === stringDate + "");



    //Reduce and Reorganize List of Reservations/Vehicles to show only one Card per Card with the Reservation List.
    let reservationListOnDateSummarized: VehicleReservation[] = [];
    reservationsListOnDate.forEach(function (currentValue, index, arr) {
        let mainData = new Object() as VehicleReservation;
        mainData.vehicle_id = currentValue.vehicle_id;
        mainData.name = currentValue.name;
        mainData.avatar = currentValue.avatar;
        mainData.bio = currentValue.bio;
        mainData.periodSelected = periodSelected;
        mainData.stringDate = stringDate;
        mainData.nameSelected = nameSelected;
        mainData.reservationsList = [];

        let auxData = new Object() as VehicleReservationsItem;
        auxData.reservation_id = currentValue.id;
        auxData.staff_reserved = currentValue.staff;
        auxData.created_at = currentValue.created_at;
        auxData.period = currentValue.period;

        let indice = reservationListOnDateSummarized.findIndex(x => x.vehicle_id == currentValue.vehicle_id);
        if (indice == -1) {
            reservationListOnDateSummarized.push(mainData);
            reservationListOnDateSummarized[reservationListOnDateSummarized.length - 1].reservationsList.push(auxData);
        } else {
            reservationListOnDateSummarized[indice].reservationsList.push(auxData);
        }
    });


    //Page Structure
    return (
        <div id="page-reserve-car" className="container">
            <PageHeader title="These are the registered cars available.">

                <form id="search-trucks">
                    <div className="input-block" id="subject-date">
                        <label htmlFor="subjectDate">Select a date: </label>
                        {// <input type="date" id="subjectDate" value={dateSelected} onChange={(e) => { searchAvailableVehicles(e) }} />
                        }
                        <input type="date" id="subjectDate" value={dateSelected} onChange={(e) => { setDateSelected(e.target.value) }} />

                    </div>

                    <div className="input-block" id="subject-name">
                        <label htmlFor="subjectName">Write your name: </label>
                        <input type="text" id="subjectName" value={nameSelected} onChange={(e) => { setNameSelected(e.target.value) }} />
                    </div>

                    <div className="input-block" id="subject-period-whole-day" >
                        <label htmlFor="subjectPeriodWholeDay">Entire Day: </label>
                        <input className="check-whole-day" type="checkbox" checked={wholeDay} id="subjectPeriodWholeDay" value={"wholeDay"} onClick={(e) => { setWholeDay(!wholeDay) }} />
                    </div>

                    <div className="input-block" id="subject-period-hours-from" style={wholeDay ? { display: "none", visibility: "hidden" } : { opacity: "1.0" }}>
                        <label htmlFor="subjectPeriodHoursFrom">From: </label>
                        <input type="time" id="subjectPeriodHoursFrom" disabled={wholeDay} style={wholeDay ? { opacity: '0.5' } : { opacity: "1.0" }} value={periodHoursFrom} onChange={(e) => { setPeriodHoursFrom(e.target.value) }} />

                    </div>

                    <div className="input-block" id="subject-period-hours-to" style={wholeDay ? { display: "none", visibility: "hidden" } : { opacity: "1.0" }}>
                        <label htmlFor="subjectPeriodHoursTo">To: </label>
                        <input type="time" id="subjectPeriodHoursTo" disabled={wholeDay} style={wholeDay ? { opacity: '0.5' } : { opacity: "1.0" }} value={periodHoursTo} onChange={(e) => { setPeriodHoursTo(e.target.value) }} />
                    </div>
                </form>


            </PageHeader>


            <main>
                {loading ? (<div><img src={loading2} width="70px" alt="Loading" />{"Loading Data. Please Wait."}</div>) : null}
                {
                    availableVehicles.map((vehicle: Vehicle) => {
                        return <CarItem key={vehicle.id} id={vehicle.id} name={vehicle.name} periodSelected={periodSelected} avatar={vehicle.avatar} bio={vehicle.bio} stringDate={stringDate} nameSelected={nameSelected} />;
                    })

                }
                {
                    reservationListOnDateSummarized.map((vehicleReservationItem: VehicleReservation) => {
                        return <CarReservedItem
                            key={vehicleReservationItem.vehicle_id}
                            periodSelected={periodSelected}
                            vehicle_id={vehicleReservationItem.vehicle_id}
                            name={vehicleReservationItem.name}
                            avatar={vehicleReservationItem.avatar}
                            bio={vehicleReservationItem.bio}
                            reservationsList={vehicleReservationItem.reservationsList}
                            stringDate={stringDate}
                            nameSelected={nameSelected} />;
                    })
                }
            </main>

        </div>


    )
}

export default ReserveCar;