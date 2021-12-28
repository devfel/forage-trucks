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
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="week_day">Dia da Semana</label>
                        <input type="text" id="week_day" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="time">Horário</label>
                        <input type="text" id="time" />
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