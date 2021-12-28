import React from "react";

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import "./styles.css"

function CarItem() {
    return (
        <article className="car-item">
            <header>
                <img src="https://m.media-amazon.com/images/M/MV5BODUyNzM1NzY0NF5BMl5BanBnXkFtZTYwNjk5ODQ0._V1_UY1200_CR147,0,630,1200_AL_.jpg" alt="Jon Doe" />
                <div>
                    <strong>Car Name</strong>
                    <span>Ano (ID)</span>
                </div>
            </header>

            <p>
                Descriçao lorem ipsun ipsum lorem teste de escrita de texto <br /><br />
                lorem ipsun ipsum lorem teste de escrita de textolorem ipsun ipsum lorem teste de escrita de texto
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>USD$ 80.00</strong>
                </p>
                <a type="button">
                    <img src={whatsappIcon} alt="WhatsApp Icon" />
                    Entrar em Contato
                </a>
            </footer>

        </article>
    );
}

export default CarItem;