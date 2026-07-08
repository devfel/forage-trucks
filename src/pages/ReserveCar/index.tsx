import React, { useEffect, useState } from "react";
import CarItem, { Vehicle } from "../../components/CarItem";
import CarReservedItem, { VehicleReservation, VehicleReservationsItem } from "../../components/CarReservedItem";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../services/supabase";
import loading2 from "../../assets/images/loading2.gif";

import "./styles.css";

function ReserveCar() {
  const today = new Date();
  const formatedToday =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    today.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [reservationsList, setReservationsList] = useState<any[]>([]);

  const [dateSelected, setDateSelected] = useState(formatedToday);
  const [nameSelected, setNameSelected] = useState(() => {
    const saved = localStorage.getItem("forage-trucks-name");
    const initialValue = JSON.parse(saved as any);
    return initialValue || "";
  });

  const [wholeDay, setWholeDay] = useState(true);
  const [periodHoursFrom, setPeriodHoursFrom] = useState("06:00");
  const [periodHoursTo, setPeriodHoursTo] = useState("22:00");
  const [loading, setLoading] = useState(true);

  const stringDate = Date.parse(dateSelected);

  const suffixHoursFrom = parseInt(periodHoursFrom.split(":")[0]) >= 12 ? "PM" : "AM";
  const suffixHoursTo = parseInt(periodHoursTo.split(":")[0]) >= 12 ? "PM" : "AM";

  const timeFromInAMPM = ((parseInt(periodHoursFrom.split(":")[0]) + 11) % 12) + 1 + ":" + periodHoursFrom.split(":")[1] + " " + suffixHoursFrom;

  const timeToInAMPM = ((parseInt(periodHoursTo.split(":")[0]) + 11) % 12) + 1 + ":" + periodHoursTo.split(":")[1] + " " + suffixHoursTo;

  const periodSelected = wholeDay ? "Entire Day" : timeFromInAMPM + " to " + timeToInAMPM;

  useEffect(() => {
    localStorage.setItem("forage-trucks-name", JSON.stringify(nameSelected));
  }, [nameSelected]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: vehiclesData, error: vehiclesError } = await supabase.from("vehicles").select("*");

      if (vehiclesError) {
        console.error(vehiclesError);
        setAvailableVehicles([]);
        setLoading(false);
        return;
      }

      const { data: reservationsData, error: reservationsError } = await supabase.from("reservations").select(`
            id,
            date,
            staff,
            created_at,
            vehicle_id,
            period,
            vehicles (
              name,
              avatar,
              bio
            )
          `);

      if (reservationsError) {
        console.error(reservationsError);
        setReservationsList([]);
        setLoading(false);
        return;
      }

      const formattedReservations = (reservationsData ?? []).map((reservation: any) => ({
        id: reservation.id,
        date: reservation.date,
        staff: reservation.staff,
        created_at: reservation.created_at,
        vehicle_id: reservation.vehicle_id,
        period: reservation.period,
        name: reservation.vehicles?.name,
        avatar: reservation.vehicles?.avatar,
        bio: reservation.vehicles?.bio,
      }));

      setReservationsList(formattedReservations);

      const reservationsOnSelectedDate = formattedReservations.filter((reservation: any) => Number(reservation.date) === stringDate);

      const reservedVehicleIds = reservationsOnSelectedDate.map((reservation: any) => reservation.vehicle_id);

      const vehiclesAvailable = (vehiclesData ?? []).filter((vehicle: Vehicle) => !reservedVehicleIds.includes(vehicle.id));

      setAvailableVehicles(vehiclesAvailable as Vehicle[]);
      setLoading(false);
    }

    loadData();
  }, [stringDate]);

  const reservationsListOnDate = reservationsList.filter((reservation) => Number(reservation.date) === stringDate);

  let reservationListOnDateSummarized: VehicleReservation[] = [];

  reservationsListOnDate.forEach(function (currentValue) {
    let mainData = {} as VehicleReservation;
    mainData.vehicle_id = currentValue.vehicle_id;
    mainData.name = currentValue.name;
    mainData.avatar = currentValue.avatar;
    mainData.bio = currentValue.bio;
    mainData.periodSelected = periodSelected;
    mainData.stringDate = stringDate;
    mainData.nameSelected = nameSelected;
    mainData.reservationsList = [];

    let auxData = {} as VehicleReservationsItem;
    auxData.reservation_id = currentValue.id;
    auxData.staff_reserved = currentValue.staff;
    auxData.created_at = currentValue.created_at;
    auxData.period = currentValue.period;

    let indexAux = reservationListOnDateSummarized.findIndex((x) => x.vehicle_id === currentValue.vehicle_id);

    if (indexAux === -1) {
      reservationListOnDateSummarized.push(mainData);
      reservationListOnDateSummarized[reservationListOnDateSummarized.length - 1].reservationsList.push(auxData);
    } else {
      reservationListOnDateSummarized[indexAux].reservationsList.push(auxData);
    }
  });

  return (
    <div id="page-reserve-car" className="container">
      <PageHeader title="These are the registered cars available.">
        <form id="search-trucks">
          <div className="input-block" id="subject-date">
            <label htmlFor="subjectDate">Select a date: </label>
            <input
              type="date"
              id="subjectDate"
              value={dateSelected}
              onChange={(e) => {
                setDateSelected(e.target.value);
              }}
            />
          </div>

          <div className="input-block" id="subject-name">
            <label htmlFor="subjectName">Write your name: </label>
            <input
              type="text"
              id="subjectName"
              value={nameSelected}
              onChange={(e) => {
                setNameSelected(e.target.value);
              }}
            />
          </div>

          <div className="input-block" id="subject-period-whole-day">
            <label htmlFor="subjectPeriodWholeDay">Entire Day: </label>
            <input
              className="check-whole-day"
              type="checkbox"
              checked={wholeDay}
              id="subjectPeriodWholeDay"
              value={"wholeDay"}
              onChange={() => {
                setWholeDay(!wholeDay);
              }}
            />
          </div>

          <div className="input-block" id="subject-period-hours-from" style={wholeDay ? { display: "none", visibility: "hidden" } : { opacity: "1.0" }}>
            <label htmlFor="subjectPeriodHoursFrom">From: </label>
            <input
              type="time"
              id="subjectPeriodHoursFrom"
              disabled={wholeDay}
              style={wholeDay ? { opacity: "0.5" } : { opacity: "1.0" }}
              value={periodHoursFrom}
              onChange={(e) => {
                setPeriodHoursFrom(e.target.value);
              }}
            />
          </div>

          <div className="input-block" id="subject-period-hours-to" style={wholeDay ? { display: "none", visibility: "hidden" } : { opacity: "1.0" }}>
            <label htmlFor="subjectPeriodHoursTo">To: </label>
            <input
              type="time"
              id="subjectPeriodHoursTo"
              disabled={wholeDay}
              style={wholeDay ? { opacity: "0.5" } : { opacity: "1.0" }}
              value={periodHoursTo}
              onChange={(e) => {
                setPeriodHoursTo(e.target.value);
              }}
            />
          </div>
        </form>
      </PageHeader>

      <main>
        {loading ? (
          <div>
            <img src={loading2} width="70px" alt="Loading" />
            {"Loading Data. Please Wait."}
          </div>
        ) : null}

        {availableVehicles.map((vehicle: Vehicle) => {
          return <CarItem key={vehicle.id} id={vehicle.id} name={vehicle.name} periodSelected={periodSelected} avatar={vehicle.avatar} bio={vehicle.bio} stringDate={stringDate} nameSelected={nameSelected} />;
        })}

        {reservationListOnDateSummarized.map((vehicleReservationItem: VehicleReservation) => {
          return <CarReservedItem key={vehicleReservationItem.vehicle_id} periodSelected={periodSelected} vehicle_id={vehicleReservationItem.vehicle_id} name={vehicleReservationItem.name} avatar={vehicleReservationItem.avatar} bio={vehicleReservationItem.bio} reservationsList={vehicleReservationItem.reservationsList} stringDate={stringDate} nameSelected={nameSelected} />;
        })}
      </main>
    </div>
  );
}

export default ReserveCar;
