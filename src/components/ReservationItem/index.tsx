import React from "react";

import reserveIcon from '../../assets/images/icons/reserve.svg'

import "./styles.css"

function ReservationItem() {
    return (
        <article className="reservation-item">
            <header>
                <img src="https://m.media-amazon.com/images/M/MV5BODUyNzM1NzY0NF5BMl5BanBnXkFtZTYwNjk5ODQ0._V1_UY1200_CR147,0,630,1200_AL_.jpg" alt="Jon Doe" />
                <div>
                    <strong>Reserved to: Fulano</strong>
                    <span>Date: 2019-02-02</span>
                    <span>Reservation Created at: 2019-02-02 18:59:20</span>
                </div>
            </header>

            <p>Vehicle ID: 2</p>
            <p>Vehicle Name: Ford F250</p>
            <p>Vehicle Bio: Descriçao lorem ipsun ipsum lorem teste de escrita de texto</p>
        </article>
    );
}

export default ReservationItem;