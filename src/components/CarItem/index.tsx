import React from "react";

import reserveIcon from '../../assets/images/icons/reserve.svg'
import api from "../../services/api";
import "./styles.css"

export interface Vehicle {
    id: number;
    avatar: string;
    bio: string;
    name: string; //Car Name.
    periodSelected: string; //period selected on the input.
    stringDate: number;
    nameSelected: string; //Staff Reserving the Vehicle.
}

const CarItem: React.FunctionComponent<Vehicle> = ({ id, avatar, periodSelected, bio, name, stringDate, nameSelected }) => {
    async function createNewReservation() {
        if (!nameSelected) {
            alert("Error: Invalid name, please insert your name.");
        } else {
            try {
                await api.post('reservations', {
                    "date": stringDate,
                    "period": periodSelected,
                    "staff": nameSelected,
                    "vehicle_id": id,
                });

                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Success: Vehicle Reserved Successfully.")
            } catch (error) {
                //CONFIRMATION OF RESERVATION MESSAGE
                alert("Error: " + error)
            }
            //REFRESH PAGE TO HIDE ITEM RESERVED.
            window.location.reload();
        }
    }

    //Transforming AM/PM BEGIN time to number format later check the availability.
    //Example: Input "8:00 PM to 10:00 PM" / Output: 1200 (20 x 60 + 00)
    function convertBeginPeriodToMinutes(periodAM_PM: string): Number {
        const periodInMinutes = (periodAM_PM.split(' to ')[0].split(' ')[1] === "PM") ?
            //Transforming PM to 24h 
            (Number(Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[0]) + 12) * 60) + Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[1])
            : //Transforming AM to 24h 
            (Number(Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[0]) + 0) * 60) + Number(periodAM_PM.split(' to ')[0].split(' ')[0].split(':')[1])
        return periodInMinutes;
    }
    //Transforming AM/PM END time to 24 hours to later check the availability.
    //Example: Input "8:00 PM to 10:30 PM" / Output: 1350 (22 x 60 + 30)
    function convertEndPeriodToMinutes(periodAM_PM: string): Number {
        const periodInMinutes = (periodAM_PM.split(' to ')[1].split(' ')[1] === "PM") ?
            //Transforming PM to 24h 
            (Number(Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[0]) + 12) * 60) + Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[1])
            : //Transforming AM to 24h 
            (Number(Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[0]) + 0) * 60) + Number(periodAM_PM.split(' to ')[1].split(' ')[0].split(':')[1])
        return periodInMinutes;
    }


    //check if the period is valid (aka, end is smaller than begging)
    function checkValidPeriod(period: string): boolean {

        if (periodSelected === "Entire Day") {
            return true;
        }

        //Don't let users reserve after midnight (due to being another day).
        if (((period.split(' to ')[0].split(' ')[0].split(':')[0] === "12") && (period.split(' to ')[0].split(' ')[1] === "AM")) ||
            ((period.split(' to ')[1].split(' ')[0].split(':')[0] === "12") && (period.split(' to ')[1].split(' ')[1] === "AM"))) {
            return false;
        }

        //period2 begins > period1 ends && period2 ends > period2 begins (NOT OVERLAP, TRUE)
        if (convertEndPeriodToMinutes(period) > convertBeginPeriodToMinutes(period)) return true;

        else return false;
    }

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
            </div>


            <footer>
                <button disabled={checkValidPeriod(periodSelected) ? false : true} onClick={createNewReservation} type="button">
                    <img id="reserveIcon" src={reserveIcon} alt="Reserve Icon" />
                    Confirm Truck
                </button>
                <strong> {new Date(stringDate).toUTCString().split(' ').slice(0, 4).join(' ')} </strong>
            </footer>
        </article>
    );
}

export default CarItem;