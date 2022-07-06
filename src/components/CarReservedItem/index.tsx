import React from "react";

import reserveIcon from '../../assets/images/icons/reserve.svg'
import api from "../../services/api";
import "./styles.css"

export interface VehicleReservation {
    vehicle_id: number;
    avatar: string;
    bio: string;
    name: string; //Car Name.
    periodSelected: string; //period selected on the input.
    stringDate: number;
    nameSelected: string; //Staff Reserving the Vehicle.
    reservationsList: VehicleReservationsItem[];
}

export interface VehicleReservationsItem {
    reservation_id: number;
    staff_reserved: string;
    created_at: string;
    period: string;
}

const CarReservedItem: React.FunctionComponent<VehicleReservation> = ({ periodSelected, vehicle_id, avatar, bio, name, stringDate, nameSelected, reservationsList }) => {
    async function createNewReservation() {
        if (!nameSelected) {
            alert("Error: Invalid name, please insert your name.");
        } else {
            try {
                await api.post('reservations', {
                    "date": stringDate,
                    "period": periodSelected,
                    "staff": nameSelected,
                    "vehicle_id": vehicle_id,
                });

                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Success: Vehicle Reserved Successfully.")
            } catch (error) {
                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Error HERE: " + error)
            }
            //REFRESH PAGE TO HIDE ITEM RESERVED.
            window.location.reload();
        }
    }

    const dReserved = new Date(+stringDate).toUTCString().split(' ').slice(0, 4).join(' ');

    //Transforming AM/PM BEGIN time to number format later check the availability.
    //Example: Input "8:00 PM to 10:00 PM" / Output: 1200 (20 x 60 + 00)
    function convertBeginPeriodToMinutes(periodAM_PM: string): Number {
        const periodMinutes = (periodAM_PM.split(' to ')[0].split(' ')[1] === "PM") ?
            //Transforming PM to Minutes 
            (Number(Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[0]) + 12) * 60) + Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[1])
            : //Transforming AM to Minutes 
            (Number(Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[0]) + 0) * 60) + Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[1])
        return periodMinutes;
    }
    //Transforming AM/PM END time to 24 hours to later check the availability.
    //Example: Input "8:00 PM to 10:30 PM" / Output: 1350 (22 x 60 + 30)
    function convertEndPeriodToMinutes(periodAM_PM: string): Number {
        const periodMinutes = (periodAM_PM.split(' to ')[1].split(' ')[1] === "PM") ?
            //Transforming PM to Minutes 
            (Number(Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[0]) + 12) * 60) + Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[1])
            : //Transforming AM to Minutes 
            (Number(Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[0]) + 0) * 60) + Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[1])
        return periodMinutes;
    }

    //check if the period is available, return true if it is possible to rent the object, false if period does not match.
    //Example: Input P1 = "8:00 PM to 10:30 PM" P2 = "10:15 PM to 11:00 PM"/ Output: false (because 10:15 starts before the p1 ends)
    //Period 1 (reservation), Period 2 (selected period)
    function checkAvailabilityPeriod(period1: string, period2: string): boolean {
        if (period1 === "Entire Day" || period2 === "Entire Day") {
            return false;
        }
        //Don't let users reserve after midnight (due to being another day).
        if (((period2.split(' to ')[0].split(' ')[0].split(':')[0] === "12") && (period2.split(' to ')[0].split(' ')[1] === "AM")) ||
            ((period2.split(' to ')[1].split(' ')[0].split(':')[0] === "12") && (period2.split(' to ')[1].split(' ')[1] === "AM"))) {
            return false;
        }
        //period2 begins > period1 ends && period2 ends > period2 begins (NOT OVERLAP, TRUE)
        if (convertBeginPeriodToMinutes(period2) >= convertEndPeriodToMinutes(period1) && convertEndPeriodToMinutes(period2) > convertBeginPeriodToMinutes(period2)) return true;
        //period2 ends < period1 begins && period2 ends > period2 begins (NOT OVERLAP, TRUE)
        if (convertEndPeriodToMinutes(period2) <= convertBeginPeriodToMinutes(period1) && convertEndPeriodToMinutes(period2) > convertBeginPeriodToMinutes(period2)) return true;
        else return false;
    }

    //console.log(checkAvailabilityPeriod("08:00 PM to 10:00 PM", periodSelected));

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

                <div className="reservations-list">
                    <p><b>Reservations Priority for {dReserved}</b></p>
                    {
                        reservationsList.sort(function (a, b) { return a.reservation_id - b.reservation_id; }).map((reservationItem: VehicleReservationsItem, index) => {
                            return (
                                <p key={reservationItem.reservation_id}>
                                    <b>{index + 1}</b>: {reservationItem.staff_reserved} - <i>Period: <b>{reservationItem.period}</b></i>
                                </p>
                            )
                        })

                    }
                </div>
            </div>


            <footer>
                {console.log(reservationsList)}
                <button disabled={reservationsList.some(res => res.period === 'Entire Day') ? true : ((reservationsList.every(res => checkAvailabilityPeriod(res.period, periodSelected))) ? false : true)} onClick={createNewReservation} type="button">
                    <img id="reserveIcon" src={reserveIcon} alt="Reserve Icon" />
                    Confirm Truck
                </button>
                <strong> {new Date(stringDate).toUTCString().split(' ').slice(0, 4).join(' ')} </strong>
            </footer>
        </article>
    );
}

export default CarReservedItem;