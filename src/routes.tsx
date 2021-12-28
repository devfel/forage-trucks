import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReservationList from "./pages/ReservationList";
import ReserveCar from "./pages/ReserveCar";
import Landing from "./pages/Landing";

function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/reserve" element={<ReserveCar />} />
                <Route path="/reservation-list" element={<ReservationList />} />
            </Routes>
        </BrowserRouter>

    );
}

export default MainRoutes;