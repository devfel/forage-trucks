import React from "react";
import CarItem from "../../components/CarItem";
import PageHeader from "../../components/PageHeader";

import "./styles.css"



function ReserveCar() {
    return (
        <div id="page-reserve-car" className="container">
            <PageHeader title="These are the registered cars available.">

                <form id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject">Date to Reserve: </label>
                        <input type="date" id="subject" />
                    </div>
                </form>


            </PageHeader>

            <main>
                <CarItem />
                <CarItem />
                <CarItem />
                <CarItem />
            </main>

        </div>


    )
}

export default ReserveCar;