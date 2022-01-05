import React from "react";

//import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import reserveIcon from '../../assets/images/icons/reserve.svg'

import "./styles.css"

function CarItem() {
    return (
        <article className="car-item">
            <header>
                <img src="https://m.media-amazon.com/images/M/MV5BODUyNzM1NzY0NF5BMl5BanBnXkFtZTYwNjk5ODQ0._V1_UY1200_CR147,0,630,1200_AL_.jpg" alt="Jon Doe" />
                <div>
                    <strong>Ford F250</strong>
                </div>
            </header>

            <p>
                <strong>Description: </strong> Descriçao lorem ipsun ipsum lorem teste de escrita de texto
            </p>

            <footer>
                <p>
                    License Plate:
                    <strong>IG**5</strong>
                </p>
                <a type="button">
                    <img id="reserveIcon" src={reserveIcon} alt="Reserve Icon" />
                    Reserve Truck
                </a>
            </footer>

        </article>
    );
}

export default CarItem;