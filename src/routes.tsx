import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReservationList from "./pages/ReservationList";
import ReserveCar from "./pages/ReserveCar";
import Landing from "./pages/Landing";

function MainRoutes() {
    return (
        <HashRouter >
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/reserve" element={<ReserveCar />} />
                <Route path="/reservation-list" element={<ReservationList />} />
            </Routes>
        </HashRouter >

    );
}

export default MainRoutes;